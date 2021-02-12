const db = require("../userModel");
const User = db.user;
const UserData = require("../userModel/userData");
const hp = require("../utils/hasProperty");

function loginUser(field){
    UserData.findDataByEmail(field.email,(result) => {
        if(!hp.hasErrorProperty(result)){
            return { "status": "500", result };
        }
    
        console.log(result);
        if(!hp.hasUserProperty(result)){
            return { "status": "404", "error": "User Not found." };
        }

        const password = User.isPasswordValid(field.password,user.password);

        if (!password) {
            return { "status": "401", "error": "Invalid Password!" };
        }

        const token = UserData.generateAuthToken(result);

        return {"token":token};
    });
}

exports.loginUser = loginUser;
