const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

async function checkAuth(req, res) {
  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken.email) throw new Error("Invalid token");
    res.status(200).send(true);
  } catch (error) {
    res.status(401).send(false);
    console.error(error);
  }
}

module.exports = { checkAuth };
