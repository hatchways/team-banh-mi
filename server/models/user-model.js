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

/**
 * Given a user object, produce the mongoose model of a user. If user object is
 * missing either email, companyName or password, will return a usage string.
 *
 * @param {object} user - user object.
 * @property {string} email - the user's email.
 * @property {string} companyName - the user's company name.
 * @property {string} password - the user's password.
 * @returns {object|string}
 */
const createNewUser = ({ email, companyName, password }) => {
  if (!email || !companyName || !password)
    return "User must have email, companyName and password properties.";
  return new User({ email, companyName, password });
};

module.exports = { createNewUser };
