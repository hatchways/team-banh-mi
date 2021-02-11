const express = require('express');
const router = express.Router();

router.get('/main', function (req, res) {
  res.render('main');
});
