const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, config.secret);
    req.email = verified;
  } catch (err) {
    res.status(401).send({ error: "Invalid token." });
  }
}

module.exports = verifyToken;
