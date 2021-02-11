const User = require("../userModel/userData");

function checkEmailExistedInModel(req,res,next){
    User.findOne({email:req.body.email}, function(err,foundUser){
        if(err){
            res.status(500).send({ "error": err });
        } else {
            if(foundUser){
                res.status(400).send({ "error": "Failed! Email is already in use!" });
                return;
            }
        }
    });
    next();
}

module.exports = checkEmailExistedInModel;