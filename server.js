/* Alvexia - New World Game Server */

console.time("Server loaded in");

/*Loading modules */

const config = require("./config.js");
const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const router = require(config.LOGIC + "/router.js");
const loader = require(config.LOGIC + "/loader.js");
const socketing = require(config.LOGIC + "/socketing.js");
const bodyParser = require("body-parser");
const auth = require(config.LOGIC + "/auth/authenticator.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

/* Loading assets */
console.time("Users loaded in");
global.users = loader.users();
console.timeEnd("Users loaded in")

/* Express router */
app.use("/", router); 
app.use((req, res) => res.json({status : false , message: "ERROR 404" })); 

/*Http Server Start */ 
server.listen(config.PORT, () => console.log("HTTP server running on port " + config.PORT));

/*Socket Server*/
io.on("connection" , (socket) => {
    
});

console.timeEnd("Server loaded in")

