const express = require("express");
const router = express.Router();
const { Mention, toggleMentionFavorite } = require("../models/mention-model");
const { mentionValidation } = require("../utils/validation");

router.get("/ping", (req, res) => {
  res.status(200).send("/mention route was pinged.");
});

router.get("/", async (req, res) => {
  try {
    const result = await Mention.find();
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Mention.findById(req.params.id);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/company/:companyName", async (req, res) => {
  try {
    const { companyName } = req.params;
    const query = req.query.search || "";
    const contentResult = await Mention.find({
      content: new RegExp(companyName, "i"),
    });
    const titleResult = await Mention.find({
      title: new RegExp(companyName, "i"),
    });
    console.log(`--- [route] query: ${query}`);
    const result = contentResult.concat(titleResult);
    const filteredResults = result.filter((mention) =>
      mention.title.includes(query)
    );
    res.status(200).send(filteredResults);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { content, title, platform, image, date, popularity } = req.body;
    const validationErrorsForMentionObject = mentionValidation({
      content,
      title,
      platform,
      image,
      date,
      popularity,
      url,
      mood,
    });
    if (
      validationErrorsForMentionObject &&
      validationErrorsForMentionObject.error
    ) {
      return res
        .status(400)
        .send(validationErrorsForMentionObject.error.details); //Return an array of error messages
    }
    const mention = new Mention({
      content,
      title,
      platform,
      image,
      date,
      popularity,
      url,
      mood,
    });
    const result = await mention.save();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const mention = await Mention.findById(req.params.id);
    const { content, title, platform, image, date, popularity } = req.body;

    const validationErrorsForMentionObject = mentionValidation({
      content,
      title,
      platform,
      image,
      date,
      popularity,
    });
    if (
      validationErrorsForMentionObject &&
      validationErrorsForMentionObject.error
    ) {
      return res
        .status(400)
        .send(validationErrorsForMentionObject.error.details); //Return an array of error messages
    }

    if (content) {
      mention.content = content;
    }
    if (title) {
      mention.title = title;
    }
    if (platform) {
      mention.platform = platform;
    }
    if (image) {
      mention.image = image;
    }
    if (date) {
      mention.date = date;
    }
    if (popularity) {
      mention.popularity = popularity;
    }
    if (mood) {
      mention.mood = mood;
    }

    const result = await mention.save();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const mention = await Mention.findById(req.params.id);
    const result = await mention.delete();
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:companyName/favorites", async (req, res) => {
  try {
    const result = await Mention.find({
      $and: [
        { favorite: true },
        {
          $or: [
            { title: new RegExp(req.params.companyName, "i") },
            { content: new RegExp(req.params.companyName, "i") },
          ],
        },
      ],
    });
    console.log(`Executing... result coming up`);
    console.log(result);
    res.status(200).send(result);
  } catch (error) {}
});

router.put("/favToggle/:id", async (req, res) => {
  try {
    await toggleMentionFavorite(req.params.id);
    res.status(200).send({ ok: true });
  } catch (e) {
    res.status(400).send({ ok: false, message: e.message });
  }
});

module.exports = router;
