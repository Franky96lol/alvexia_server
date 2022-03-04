/* Socket Routes*/
const config = require("../config.js");
const chat = require(config.LOGIC + "/socket/chat.js");

async function socketing (io , socket , username){
    await require(config.LOGIC + "/socket/connection.js")(io, socket , username);
    await require(config.LOGIC + "/socket/disconnect.js")(io , socket , username);
    await require(config.LOGIC + "/socket/movement.js")(io , socket , username);
    await chat(io , socket , username);
    await require(config.LOGIC + "/socket/inventory.js")(io, socket , username);
};

module.exports = socketing;