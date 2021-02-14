const express = require("express");
const router = express.Router();
const verifyRegister = require("../middlewares/verifyRegister");
const controller = require("../controllers/registerController");
const auth = require("../middlewares/auth");
const hp = require("../utils/hasProperty");

router.get("/",function(req,res){
    res.status(200).send({ message: "register page displayed successfully!" });
});

router.post("/", function(req, res, next) {
    const message = validateRequest(req.body);
    if(!hp.hasValidProperty(message))
        return res.status(400).send(message);
    
    let result = verifyRegister.checkEmailExistedInModel(req,res,next);

    if(hp.hasStatusProperty(result)){
        res.status(result.status).send(result.error);
    }

    result = controller.registerUser(req.body);

    if(hp.hasStatusProperty(result)){
        res.status(result.status).send(result.error);
    }

    const token = result.token;

    const expiration = 10;

    res.cookie('x-auth-token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, 
        httpOnly: true,
    });

    res.status(201).send({
        email: req.body.email,
        companyName: req.body.companyName,
        accessToken: token
    });
});



function isStringNullOREmptyORUndefined(field) {
  if (typeof field === undefined || typeof field === null || field === "")
    return true;
  else return false;
}

function validateRequest(field){
    if(!isPasswordValid(field.password)){
        return {"error": "Password parameter must be greater than 6"};
    }
    if(isStringNullOREmptyORUndefined(field.companyName)){
        return {"error": "Company name parameter is required"};
    }
    if(isStringNullOREmptyORUndefined(field.email)){
        return {"error": "Email parameter is required"};
    }

  return { valid: true };
}

function isPasswordValid(password) {
  if (password.length > 6) {
    return { valid: true };
  } else {
    return false;
  }
}

module.exports = router;
