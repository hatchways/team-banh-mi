const UserData = require("../userModel/userData");
const db = require("../userModel");
const User = db.user;
const hp = require("../utils/hasProperty");

function checkEmailExistedInModel(req,res,next){
    UserData.findDataByEmail(req.body.email,(result) => {
        console.log("checkEmailExistedInModel"+result);
        if(!hp.hasErrorProperty(result)){
            return { "status": "500", result };
        }
    
        console.log(user);
        if(hp.hasUserProperty(result)){
            return { "status": "400", "error": "Failed! Email is already in use!" };
        }
    });
    return {};
}

exports.checkEmailExistedInModel = checkEmailExistedInModel;
