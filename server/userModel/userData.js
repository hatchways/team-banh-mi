const User = require("./user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function encryptPasswordWithSalt(plaintextPassword) {
  return bcrypt.hash(plaintextPassword, saltRounds);
}

function isPasswordValid(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash);
}

function generateAuthToken(user) {
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });
  return token;
}

exports.encryptPasswordWithSalt = encryptPasswordWithSalt;
exports.isPasswordValid = isPasswordValid;
exports.generateAuthToken = generateAuthToken;
