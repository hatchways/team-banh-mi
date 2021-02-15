const User = require("../models/user-model");
const cookie = require("../utils/cookies");

async function registerUser(req,res) {
  try {
    const {error} = validateRequest(req.body);
    if(error)
      return res.status(400).send(error);
    const newUser = new User(req.body);
    console.log(newUser);
    const {token,err} = await newUser._registerUser();
    if(!token){
      return res.status(500).send(err);
    }
    else{
      res.cookie(cookie.getCookiesName(), token, cookie.generateCookiesObject());
      return res.status(201).send({
        email: req.body.email,
        companyName: req.body.companyName,
        accessToken: token
      });
    }
  } catch (error) {
    return {
      ok: false,
      status: "500",
      errorMessage: error,
    };
  }
}

function isStringNullOREmptyORUndefined(field){
  if(typeof field === undefined || typeof field === null || field === "")
    return true;
  else 
    return false;
}

function validateRequest(field){
  if(!isPasswordValid(field.password)){
      return {error: "Password parameter must be greater than 6"};
  }
  if(isStringNullOREmptyORUndefined(field.companyName)){
    return {error: "Company name parameter is required"};
  }
  if(isStringNullOREmptyORUndefined(field.email)){
    return {error: "Email parameter is required"};
  }

  return {valid:true};
}

function isPasswordValid(password){
    if(password.length > 6){
        return true;
    } else {
        return false;
    }
}

exports.registerUser = registerUser;

/*const User = require("../models/user-model");
const cookie = require("../utils/cookies");

async function registerUser(user) {
  try {
    const newUser = new User(user);
    console.log("wait");
    const {token,errorObject} =  await newUser._registerUser();
    console.log(token);
    if(errorObject)
      return {
        ok: false,
        status: "500",
        errorMessage: error,
      };

    if(token){
      res.cookie(cookie.getCookiesName(), token, cookie.generateCookiesObject());
      return {
        ok: true,
        status: "201",
        user:{
          email: user.email,
          companyName: user.companyName,
          accessToken: token
        }
      }
    }
  } catch (error) {
    return {
      ok: false,
      status: "500",
      errorMessage: error,
    };
  }
}

exports.registerUser = registerUser;*/
