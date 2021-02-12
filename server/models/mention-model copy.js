const mongoose = require("mongoose");

/**
 * Mention Schema.
 * @property {string} content - content of the Mention.
 * @property {string} title - title of the Mention.
 * @property {string} platform - platform of the Mention.
 * @property {string} image - image of the Mention.
 * @property {string} date - date of the Mention.
 * @property {string} popularity - popularity of the Mention.
 */
const MentionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
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
    type: Date,
    required: true,
  },
  popularity: {
    type: String,
  },
});

/**
 * Mention Model.
 * @constructor
 * @property {string} content - content of the Mention.
 * @property {string} title - title of the Mention.
 * @property {string} platform - platform of the Mention.
 * @property {string} image - image of the Mention.
 * @property {string} date - date of the Mention.
 * @property {string} popularity - popularity of the Mention.
 */
const Mention = mongoose.model("Mention", MentionSchema);

/**
 * Given a Mention object, produce the mongoose model of a Mention. If Mention object is
 * missing either content, title, platform, date will return a usage string.
 *
 * @param {object} Mention - Mention object. *
 * @property {string} content - content of the Mention.
 * @property {string} title - title of the Mention.
 * @property {string} platform - platform of the Mention.
 * @property {string} date - date of the Mention.
 * @returns {object|string}
 */
const createNewMention = ({ content, companyName, platform }) => {
  if (!content || !companyName || !platform)
    return "Mention must have content, companyName and platform properties.";
  return new Mention({ content, title, platform, image, date, popularity });
};

module.exports = { createNewMention };
