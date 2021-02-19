const { COOKIES_EXPIRES_MS } = process.env;

function generateCookiesObject() {
  return {
    maxAge: COOKIES_EXPIRES_MS,
    secure: false,
    httpOnly: true,
  };
}

function getCookiesName() {
  return "x-auth-token";
}

module.exports = { getCookiesName, generateCookiesObject };
