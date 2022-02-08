/* On Connection */

const connection = (io, socket, username) => {
    const acc = JSON.parse(JSON.stringify(global.users[username]));
    delete acc.password;
    socket.join("map_" + acc.pos.map);
    socket.broadcast.to("map_" + acc.pos.map)
    global.world[acc.pos.map].pjs[username] = acc;
    socket.emit("player", acc);
    socket.emit("map", global.world[acc.pos.map]);
};

module.exports = connection;