const express = require("express");
const router = express.Router();
const verifyRegister = require("../middlewares/verifyRegister");
const controller = require("../controllers/registerController");
const auth = require("../middleware/auth");

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register", function(req, res, next) {
    const message = validateRequest(req.body);
    if(!hasValidProperty(message))
        return res.status(400).send(message);
    
    verifyRegister.checkEmailExistedInModel(req,res,next);

    controller.registerUser(req,res);
});

function hasValidProperty(name){
    return name.hasOwnProperty('valid');
}

function isStringNullOREmptyORUndefined(field){
    if(typeof field === undefined || typeof field === null || field === "")
        return true;
    else 
        return false;
}

function validateRequest(field){
    if(!isPasswordValid(field.password))
        return {"error": "Password parameter must be greater than 6"};
    if(!isStringNullOREmptyORUndefined(field.companyName))
        return {"error": "Company name parameter is required"};
    if(!isStringNullOREmptyORUndefined(field.email))
        return {"error": "Email parameter is required"};

    return {"valid":true};
}

function isPasswordValid(password){
    if(password.length > 6){
        return {"valid":true};
    } else {
        return false;
    }
}

module.exports = router;



