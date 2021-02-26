function logoutUser(req, res) {
  res.clearCookie('x-auth-token');
  res.status(200);
  res.send('Logout successful');
}

module.exports = { logoutUser };