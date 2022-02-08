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

/*Generating World*/
//require(config.LOGIC + "/install/world_map.js")(50 , 80);

/* Loading assets */
// Users
global.users = [];
loader.users();
//World
global.world = [];
loader.world();

/* Express router */
app.use("/", router); 
// Wakeup route
app.post("/wakeup" , (req , res) =>{
    res.json({status : true});
});
//Error route
app.use((req, res) => res.json({status : false , message: "ERROR 404" })); 

/* Http Server Start */ 
server.listen(config.PORT, () => console.log("HTTP server running on port " + config.PORT));

/* Socket Connection */
io.on("connection" , (socket) => {
    if(socket.handshake.query.username == undefined || socket.handshake.query.token == undefined){
        socket.disconnect();
        return;
    }
    const username = socket.handshake.query.username,
    token = socket.handshake.query.token;
    
    if(!auth.verify(token)){
        
    }
});

console.timeEnd("Server loaded in")