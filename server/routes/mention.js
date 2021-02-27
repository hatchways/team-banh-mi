const express = require("express");
const router = express.Router();
const { Mention } = require("../models/mention-model");
const { mentionValidation } = require("../utils/validation");

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

router.get("/:companyName", async (req, res) => {
  try {
    const { companyName } = req.params;
    const result = await Mention.find({ companyName });
    res.status(200).send(result);
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
      url
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
      url
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

module.exports = router;
