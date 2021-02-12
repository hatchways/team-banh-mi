const UserData = require("../userModel/userData");
const db = require("../userModel");
const User = db.user;

function checkEmailExistedInModel(req,res,next){
    UserData.findDataByEmail(req.body.email,(result) => {
        console.log("checkEmailExistedInModel"+result);
        if(!hasErrorProperty(result)){
            return { "status": "500", result };
        }
    
        console.log(user);
        if(hasUserProperty(result)){
            return { "status": "400", "error": "Failed! Email is already in use!" };
        }
    });
    return {};
}

function hasUserProperty(name){
    console.log(name);
    return name.hasOwnProperty('User');
}

function hasErrorProperty(name){
    console.log(name);
    return name.hasOwnProperty('error');
}

exports.checkEmailExistedInModel = checkEmailExistedInModel;