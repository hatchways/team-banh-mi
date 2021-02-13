const User = require("../userModel/user");

async function registerUser(user) {
  try {
    const newUser = new User(user);
    return await newUser._registerUser();
  } catch (error) {
    return {
      ok: false,
      status: "500",
      errorMessage: error,
    };
  }
}

exports.registerUser = registerUser;
