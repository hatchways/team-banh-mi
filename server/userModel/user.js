const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = {
    email: String,
    companyName: String,
    password: String
}

const User = new mongoose.Mongoose.model("User", userSchema);

module.exports = User;