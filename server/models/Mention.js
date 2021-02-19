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

module.exports = mongoose.model("Mention", MentionSchema);
