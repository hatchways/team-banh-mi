const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", function (req, res) {
  const verified = auth.verifyToken(req);
  if (verified) {
    res.render("main");
  } else {
    res.redirect("/login");
  }
});
