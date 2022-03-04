const router = require("express").Router();
const register = require("./register.js"); 
const login = require("./login.js");
const verifyMail = require("./verifyMail.js");

router.post("/register", async function (req , res) {
    await register(req , res)
}); 

router.post("/login" , async function (req , res) {
    await login(req , res)
});

router.get("/verify/:user/:id" , async function (req , res) { 
    await verifyMail(req ,res)
});

module.exports = router;