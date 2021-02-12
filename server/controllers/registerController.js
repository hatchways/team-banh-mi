const db = require("../userModel");
const User = db.user;
const UserData = require("../userModel/userData");

function registerUser(field){
    const user = UserData.createNewUserObject(field);
    
    const result = UserData.saveDataToUserModel(user);

    if(!hasValidProperty(result)){
        return { "status": "500", "error": result };;
    }

    const token = UserData.generateAuthToken(user);

    return {"token": token}; 
}

function hasValidProperty(name){
    return name.hasOwnProperty('valid');
}

exports.registerUser = registerUser;