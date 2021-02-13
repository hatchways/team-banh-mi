const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function isPasswordValid(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash);
}

function generateAuthToken(user) {
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });
  return token;
}

exports.isPasswordValid = isPasswordValid;
exports.generateAuthToken = generateAuthToken;
