/* Socket Routes*/
const config = require("../config.js");
const chat = require(config.LOGIC + "/socket/chat.js");

async function socketing (io , socket , username){
    require(config.LOGIC + "/socket/connection.js")(io, socket , username);
    require(config.LOGIC + "/socket/disconnect.js")(io , socket , username);
    require(config.LOGIC + "/socket/movement.js")(io , socket , username);
    chat(io , socket , username);
    require(config.LOGIC + "/socket/inventory.js")(io, socket , username);
};

module.exports = socketing;