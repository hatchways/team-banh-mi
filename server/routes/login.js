const controller = require("../controllers/loginController");
const express = require("express");
const router = express.Router();

router.post("/", controller.loginUser);

module.exports = router;