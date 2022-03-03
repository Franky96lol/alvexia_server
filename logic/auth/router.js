const router = require("express").Router();
const register = require("./register.js"); 
const login = require("./login.js");
const verifyMail = require("./verifyMail.js");

router.post("/register", function (req , res) {
    register(req , res)
}); 

router.post("/login" , function (req , res) {
    login(req , res)
});

router.get("/verify/:user/:id" , function (req , res) { 
    verifyMail(req ,res)
});

module.exports = router;