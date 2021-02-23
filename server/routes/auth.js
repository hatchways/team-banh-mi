const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const checkAuthControler = require("../controllers/checkAuthController");
const express = require("express");
const router = express.Router();

router.post("/register", registerController.registerUser);

router.post("/login", loginController.loginUser);

router.post("/logout", logoutController.logoutUser);

router.post("/checkAuth", checkAuthControler.checkAuth);

module.exports = router;
