const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/",function(req,res){
    if(auth.verifyToken(req)){
        res.render("main");
    } else {
        res.redirect("/login");
    }     
});