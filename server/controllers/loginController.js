const User = require("../userModel/user");
const { isPasswordValid, generateAuthToken } = require("../userModel/userData");

async function loginUser({ email, password }) {
  const [user] = await User.findByEmail(email);
  if (!user) return { status: 404, error: "User not found" };
  if (user.error) return { status: 500, result: user };
  const isValid = await isPasswordValid(password, user.password);
  if (!isValid) return { status: 401, error: "Invalid password!" };
  const token = generateAuthToken({ email });
  return { token };
}

exports.loginUser = loginUser;
