const controller = require("../controllers/registerController");
const express = require("express");
const router = express.Router();

router.post("/", controller.registerUser);

module.exports = router;

