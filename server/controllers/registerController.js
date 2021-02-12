const db = require("../userModel");
const User = db.user;
const UserData = require("../userModel/userData");
const hp = require("../utils/hasProperty");

function registerUser(field){
    const user = UserData.createNewUserObject(field);
    
    const result = UserData.saveDataToUserModel(user);

    if(!hp.hasValidProperty(result)){
        return { "status": "500", "error": result };;
    }

    const token = UserData.generateAuthToken(user);

    return {"token": token}; 
}

exports.registerUser = registerUser;