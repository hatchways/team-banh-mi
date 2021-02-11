const express = require("express");
const router = express.Router();
const controller = require("../controllers/loginController");
const auth = require("../middleware/auth");

router.post("/login", function(req, res, next) {    
    controller.loginUser(req,res);
});

router.get("/login",function(req,res,next){
    auth.verifyToken(req, res, next);
    res.render("login");
});


 
module.exports = router;
