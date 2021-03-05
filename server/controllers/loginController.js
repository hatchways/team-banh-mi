const User = require("../models/user-model");
const cookie = require("../utils/cookies");
const {
  isPasswordValid,
  generateAuthToken,
} = require("../utils/authentication");

async function loginUser(req, res) {
  const user = await User.findByEmail(req.body.email);
  if (!user)
    return res.status(404).send({ ok: false, errorMessage: "User not found" });
  if (user.error) {
    return res.status(500).send({
      ok: false,
      status: 500,
      errorMessage: "Database error",
      error: user.error,
    });
  }
  const isValid = await isPasswordValid(req.body.password, user.password);
  if (!isValid)
    return res
      .status(401)
      .send({ ok: false, status: 401, errorMessage: "Invalid password!" });
  const { token, err } = generateAuthToken(req.body);

  if (token) {
    res.cookie(cookie.getCookiesName(), token, cookie.generateCookiesObject());
    console.log(`--- [loginControler] user.companyName: ${user.companyName}`);
    return res.status(200).send({
      email: user.email,
      companyName: user.companyName,
      accessToken: token,
    });
  } else {
    return res.status(404).send({ ok: false, errorMessage: "Token not found" });
  }
}

exports.loginUser = loginUser;
