const express = require("express");
const router = express.Router();
const controller = require("../controllers/loginController");
const hp = require("../utils/hasProperty");

router.post("/", function(req, res) {    
    const result = controller.loginUser(req.body);

    if(hp.hasStatusProperty(result)){
        res.status(result.status).send(result.error);
    }

    const token = result.token;

    const expiration = 10;

    res.cookie('x-auth-token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, 
        httpOnly: true,
    });

    res.status(200).send({
        email: req.body.email,
        companyName: req.body.companyName,
        accessToken: token
    });
});

module.exports = router;
