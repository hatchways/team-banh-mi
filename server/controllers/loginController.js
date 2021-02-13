const User = require("../userModel/user");
const { isPasswordValid, generateAuthToken } = require("../userModel/userData");

async function loginUser({ email, password }) {
  const [user] = await User.findByEmail(email);
  if (!user) return { ok: false, status: 404, errorMessage: "User not found" };
  if (user.error)
    return {
      ok: false,
      status: 500,
      errorMessage: "Database error",
      error: user.error,
    };
  const isValid = await isPasswordValid(password, user.password);
  if (!isValid)
    return { ok: false, status: 401, errorMessage: "Invalid password!" };
  const token = generateAuthToken({ email });
  return { token };
}

exports.loginUser = loginUser;
