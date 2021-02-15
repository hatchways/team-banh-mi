const User = require("../models/user-model");
const cookie = require("../utils/cookies");
const {
  isPasswordValid,
  generateAuthToken,
} = require("../utils/authentication");

async function loginUser(req,res) {
  const user = await User.findByEmail(req.body.email);
  console.log(user);
  if (!user) return res.status(404).send({ ok: false, errorMessage: "User not found" });
  if (user.error){
    return res.status(404).send({ 
      ok: false,
      status: 500,
      errorMessage: "Database error",
      error: user.error
    });
  }
  const isValid = await isPasswordValid(req.body.password, user.password);
  if (!isValid)
    return res.status(401).send({ ok: false, status: 401, errorMessage: "Invalid password!" });
  const token = generateAuthToken(req.body.email);
  
  if(token){
    res.cookie(cookie.getCookiesName(), token, cookie.generateCookiesObject());  
    return res.status(200).send({
      email: user.email,
      companyName: user.companyName,
      accessToken: token
    });
  }
}

exports.loginUser = loginUser;