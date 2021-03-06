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

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/*Generating World*/
require(config.LOGIC + "/install/world_map.js")(10 , 50);

/* Loading assets */
// Users
global.users = {};
loader.users();
//Objects
global.objects = {};
loader.objects();
//World
global.world = {};
loader.world();
//Items
global.items = {};
loader.items();
//Player status
global.stats = {};


/* Starting Game Engine */
const GEngine = require(config.LOGIC + "/engine.js");
const Engine = new GEngine(io).start();

/* Express router */
app.use("/", router);
// Wakeup route
app.post("/wakeup", function (req, res){
    res.json({
        status: true
    });
});
//Error route
app.use(function (req , res){ 
    res.json({
    status: false, message: "ERROR 404"});
});

/* Http Server Start */
server.listen(config.PORT, function (){
    console.log("HTTP server running on port " + config.PORT);
});

/* Socket Connection */
io.on("connection", async function (socket) {
    if (socket.handshake.query.username == undefined || socket.handshake.query.token == undefined) {
        socket.disconnect();
        return;
    }
    const username = socket.handshake.query.username,
    token = socket.handshake.query.token;
    const verify = auth.verify(token);
    if (verify == false) {
        socket.disconnect();
        return;
    }
    if (global.users[username] == undefined) {
        socket.disconnect();
        return;
    }
    if (global.users[username].id != verify) {
        socket.disconnect();
        return;
    }
    
    io.sockets[username] = socket;
    
    await socketing(io, socket, username);
});

console.timeEnd("Server loaded in")