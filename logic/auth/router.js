const router = require("express").Router();
const register = require("./register.js"); 
const login = require("./login.js");
const verifyMail = require("./verifyMail.js");

router.post("/register", (req , res) => register(req , res)); 

router.post("/login" , (req , res) => login(req , res));

router.get("/verify/:user/:id" , (req , res) => res.json(verifyMail(req ,res)));

module.exports = router;