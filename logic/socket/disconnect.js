/* On disconnect */

const config = require("../../config.js");

async function disconnect (io, socket, username){
    await socket.on("disconnect", async function (data) {
        await socket.broadcast.to("map_" + global.users[username].pos.map).emit("del_pj", username);
        delete global.world[global.users[username].pos.map].pjs[username];
        await socket.leave("map_" + global.users[username].pos.map);
        global.users[username].isOnline = false;
        return;
    });
}

module.exports = disconnect;