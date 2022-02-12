/* On disconnect */

const config = require("../../config.js");

const disconnect = (io, socket, username) => {
    socket.on("disconnect", (data) => {
        socket.broadcast.to("map_" + global.users[username].pos.map).emit("del_pj", username);
        delete global.world[global.users[username].pos.map].pjs[username];
        socket.leave("map_" + global.users[username].pos.map);
        global.users[username].isOnline = false;
        return;
    });
}

module.exports = disconnect;