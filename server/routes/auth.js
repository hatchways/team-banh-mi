const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const express = require("express");
const router = express.Router();

router.post("/register", registerController.registerUser);

router.post("/login", loginController.loginUser);

module.exports = router;
