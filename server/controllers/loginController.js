const config = require('../config/auth.config');
const User = require('../userModel/userData');
var jwt = require('jsonwebtoken');

function loginUser(req, res) {
  user = User.findDataByEmail(req.body.email);

  if (hasValidProperty(user)) {
    res.status(500).send({ user });
  }

  if (!user) {
    return res.status(404).send({ error: 'User Not found.' });
  }

  const password = User.isPasswordValid(req.body.password, user.password);

  if (!password) {
    return res
      .status(401)
      .send({ accessToken: null, error: 'Invalid Password!' });
  }

  var token = jwt.sign({ email: user.email }, config.secret, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({
    id: user._id,
    email: user.email,
    companyName: user.companyName,
    accessToken: token,
  });
}

function hasValidProperty(name) {
  return name.hasOwnProperty('valid');
}

module.exports = loginUser;
