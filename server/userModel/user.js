const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    companyName: String,
    password: String
  })
);

module.exports = User;
