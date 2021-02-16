const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET,JWT_EXPIRES_MS } = process.env;

/**
 * Given a plain text password and a hashed password, produce true if the plain
 * text password, hashed, is equal to the hashed password. Else produce false.
 *
 * @param {string} plaintextPassword - plain text password.
 * @param {string} hash - hashed password
 * @returns {boolean} true if the plain text password hashed is the same as the
 * hashed password. Else false.
 */
function isPasswordValid(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash);
}

/**
 * Given a user object with an email property, produce a token with the given
 * email, signed with a secret.
 *
 * @param {object} user - a user object.
 * @property {string} email - the email of the given user.
 * @returns {string} The token signed with a secret key.
 */
function generateAuthToken(user) {
  try{
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_MS
    });
    return {token:token};
  } catch(error){
    return {err:error};
  }
}

module.exports = { isPasswordValid, generateAuthToken };
