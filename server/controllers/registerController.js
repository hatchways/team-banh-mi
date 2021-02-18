const User = require("../models/user-model");
const cookie = require("../utils/cookies");
const { generateAuthToken } = require("../utils/authentication");

async function registerUser(req,res) {
  try {
    const {error} = validateRequest(req.body);
    if(error)
      return res.status(400).send(error);
    const newUser = new User(req.body);
    const {err,save} = await newUser.registerUser();
    if(err){
      return res.status(500).send(err);
    }
    else{
      const {token,err}= generateAuthToken(newUser.email);
      if(err){
        return res.status(404).send({ ok: false, errorMessage: "Token not found" })
      }
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