const mongoose = require("mongoose");

/**
 * User Schema.
 * @property {string} email - email of the user.
 * @property {string} companyName - company name of the user.
 * @property {string} password - password of the user.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * User Model.
 * @constructor
 * @property {string} email - email of the user.
 * @property {string} companyName - company name of the user.
 * @property {string} password - password of the user.
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
