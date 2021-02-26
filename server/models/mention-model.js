const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

/**
 * Mention Schema.
 * @property {string} content - content of the Mention.
 * @property {string} title - title of the Mention.
 * @property {string} platform - platform of the Mention.
 * @property {string} image - image of the Mention.
 * @property {string} date - date of the Mention.
 * @property {string} popularity - popularity of the Mention.
 * @property {string} url - url of the Mention source.
 */
const mentionSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  popularity: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

const Mention = mongoose.model("mention", mentionSchema);

async function createMention(data) {
  await Mention.findOneAndUpdate(
    { url: data.url },
    {
      content: data.content,
      title: data.title,
      platform: data.platform,
      image: data.image,
      date: data.date,
      popularity: data.popularity,
      url: data.url,
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    }
  );
}

async function getMention(companyName, platformSearch) {
  const result = await Mention.find({
    title: new RegExp(companyName, "i"),
    platform: new RegExp(platformSearch, "i"),
  });
  return result;
}

module.exports = {
  createMention,
  getMention,
  Mention,
};
