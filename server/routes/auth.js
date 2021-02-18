const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const checkAuthControler = require("../controllers/checkAuthController");
const express = require("express");
const router = express.Router();

router.post("/register", registerController.registerUser);

router.post("/login", loginController.loginUser);

router.post("/checkAuth", checkAuthControler.checkAuth);

module.exports = router;
