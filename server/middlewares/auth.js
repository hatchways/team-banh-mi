const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

function verifyToken(req){

    const token = req.cookies["x-auth-token"];

    if(!token) return {"status": "401", "error": "Access denied. No token provided."};

    try{
        const verified = jwt.verify(token,config.secret);
        return verified;
    } catch(err) {
        return {"status": "401", "error": "Invalid token."};
    }
}

module.exports = verifyToken;
