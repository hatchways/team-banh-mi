const User = require("../userModel/userData");

function registerUser(req, res) {
  const user = User.createNewUserObject(req.body);

  const result = User.saveDataToUserModel(user);

  if (!hasValidProperty(result)) res.status(500).send(result);

  const token = User.generateAuthToken(user);

  res
    .header("x-auth-token", token)
    .status(201)
    .send({ email: user.email, companyName: user.companyName })
    .redirect("main");

  /*res.header("x-auth-token", token).send({
        _id: user._id,
        name: user.name,
        email: user.email
      });

    res.status(200).send({
        id: user._id,
        email: user.email,
        companyName: user.companyName,
        accessToken: token
    });

    res.status(201).render("main");*/
}

function hasValidProperty(name) {
  return name.hasOwnProperty("valid");
}

module.exports = registerUser;
