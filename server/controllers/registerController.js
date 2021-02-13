const db = require("../userModel");
const User = db.user;
const { createNewUser, generateAuthToken } = require("../userModel/userData");
const hp = require("../utils/hasProperty");

function registerUser(field) {
  const result = createNewUser(field);

  if (!result.ok) {
    return {
      ...result,
      status: "500",
      errorMessage: "User registration failed",
    };
  }

  const token = generateAuthToken(user);

  return { token: token };
}

exports.registerUser = registerUser;
