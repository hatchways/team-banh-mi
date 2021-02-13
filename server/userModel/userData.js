const User = require("./user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

function encryptPasswordWithSalt(plaintextPassword) {
  return bcrypt.hash(plaintextPassword, saltRounds);
}

function isPasswordValid(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash);
}

async function createNewUserObject(user) {
  try {
    const newUser = new User({
      email: user.email,
      companyName: user.companyName,
      password: await encryptPasswordWithSalt(user.password),
      isActive: true,
    });

    return newUser;
  } catch (error) {
    console.error(error);
  }
}

function saveDataToUserModel(newUser) {
  newUser.save(function (err) {
    if (err) {
      return { error: "Error while saving data in database." };
    } else {
      return { valid: true };
    }
  });
  return { valid: true };
}

function findDataByEmail(userEmail) {
  User.findOne({ email: userEmail }, function (err, foundUser) {
    if (err) {
      return { error: "Error while fetching data in databse." };
    } else {
      return { User: foundUser };
    }
  });
}

function generateAuthToken(user) {
  const token = jwt.sign({ email: user.email }, config.secret, {
    expiresIn: 86400, // 24 hours
  });

  return token;
}

exports.encryptPasswordWithSalt = encryptPasswordWithSalt;
exports.isPasswordValid = isPasswordValid;
exports.findDataByEmail = findDataByEmail;
exports.saveDataToUserModel = saveDataToUserModel;
exports.createNewUserObject = createNewUserObject;
exports.generateAuthToken = generateAuthToken;
