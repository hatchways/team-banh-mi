const User = require("./user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { databaseErrorHandler } = require("../utils/database");
const { JWT_SECRET } = process.env;

function encryptPasswordWithSalt(plaintextPassword) {
  return bcrypt.hash(plaintextPassword, saltRounds);
}

function isPasswordValid(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash);
}

async function createNewUser({ email, companyName, password }) {
  try {
    const newUser = new User({
      email,
      companyName,
      password,
    });

    const result = await newUser.processAndSaveUser();
    if (result.ok) return result;
  } catch (error) {
    databaseErrorHandler(error);
  }
}

function generateAuthToken(user) {
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return token;
}

exports.encryptPasswordWithSalt = encryptPasswordWithSalt;
exports.isPasswordValid = isPasswordValid;
exports.createNewUser = createNewUser;
exports.generateAuthToken = generateAuthToken;
