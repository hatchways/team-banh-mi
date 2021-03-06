const sentimentAnalysis = require("sentiment-analysis");
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
 * @property {boolean} favorite - true if the mention was favorited, else false.
 * @property {string} mood - mood of mention source.
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
  favorite: {
    type: Boolean,
  },
  mood: {
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
      favorite: data.favorite,
      mood: displaySentiment(data.content),
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    }
  );
}

function displaySentiment(text) {
  const sentiment = sentimentAnalysis(text);
  let overallSentiment = "neutral";
  if (sentiment > 0.2) overallSentiment = "good";
  else if (sentiment < -0.2) overallSentiment = "bad";
  return overallSentiment;
}

/**
 * Given an array of objects with mention data, create mentions for each object
 * and store them in the database.
 *
 * @param {object[]} mentionsArr - an array of objects with all the properties
 * of Mentions, see {@link mentionSchema}.
 * @returns {void}
 */
async function storeArrayOfMentions(mentionsArr) {
  try {
    mentionsArr.forEach((mention) => createMention(mention));
  } catch (error) {
    console.error(error);
  }
}

async function getMention(companyName, platformSearch) {
  const result = await Mention.find({
    $or: [
      { title: new RegExp(companyName, "i") },
      { content: new RegExp(companyName, "i") },
    ],
    platform: new RegExp(platformSearch, "i"),
  });
  return result;
}

async function getFavoriteMentions(companyName) {
  const result = await Mention.find({
    $or: [
      { title: new RegExp(companyName, "i") },
      { content: new RegExp(companyName, "i") },
    ],
    favorite: true,
  });
  return result;
}

async function toggleMentionFavorite(id) {
  await Mention.findById(id, (err, mention) => {
    mention.favorite = !mention.favorite;
    mention.save();
  });
}

module.exports = {
  createMention,
  getMention,
  getFavoriteMentions,
  storeArrayOfMentions,
  toggleMentionFavorite,
  displaySentiment,
  Mention,
};
