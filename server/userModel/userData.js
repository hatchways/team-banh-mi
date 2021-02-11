const User = require("./user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const registerUser = require("../controllers/registerController");
const { model } = require("mongoose");
const saltRounds = 10;

function encryptedPasswordWithSalt(plaintextPassword){
    bcrypt.hash(plaintextPassword, saltRounds, function(err,hash){
        return hash;
    });
}

function isPasswordValid(plaintextPassword,hash){
    bcrypt.compare(plaintextPassword, hash, function(err,result){
        return result;
    });
}

function createNewUserObject(user){
    const newUser = new User({
        email:user.email,
        companyName:user.companyName,
        password: encryptedPasswordWithSalt(user.password)
    });

    return newUser;
}

function saveDataToUserModel(newUser){
    newUser.save(function(err){
        if(err){
            return {"error": "Error while saving data in database."};
        } else {
            return {"valid":true};
        }
    });
}


function findDataByEmail(userEmail){
    User.findOne({email:userEmail}, function(err,foundUser){
        if(err){
            return {"error": "Error while fetching data in databse."};
        } else {
            return foundUser;
        }
    });
}

function generateAuthToken(user){
    const token = jwt.sign({ email: user.email }, config.secret, { 
        expiresIn: 86400 // 24 hours
    });
    return cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
    });
}

const UserData = {
    isPasswordValid,
    findDataByEmail,
    saveDataToUserModel,
    createNewUserObject,
    generateAuthToken
};

module.exports = UserData;

/*User.findOne({email:req.body.email}, function(err,foundUser){
    if(err){
        res.status(500).send({ "error": err });
    } else {
        if(foundUser){
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
    }
});*/