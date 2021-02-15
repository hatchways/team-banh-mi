const { COOKIES_EXPIRES } = process.env;

function generateCookiesObject(){
    return {
        expires: new Date(Date.now() + COOKIES_EXPIRES),
        secure: false, 
        httpOnly: true,
    }
  }
  
function getCookiesName(){
    return "x-auth-token";
}

module.exports = { getCookiesName, generateCookiesObject };