const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const { JWT_SECRET } = process.env;

async function checkAuth(req, res) {
  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken.email) throw new Error("Invalid token");
    const user = await User.findByEmail(decodedToken.email);
    res.status(200).send({ companyName: user.companyName });
  } catch (error) {
    res.status(401).send(false);
    console.error(error);
  }
}

module.exports = { checkAuth };
