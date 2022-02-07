const router = require("express").Router();
const register = require("./register.js"); 
const login = require("./login.js")

router.post("/register", (req , res) => register(req , res)); 

router.post("/login" , (req , res) => login(req , res));

module.exports = router;