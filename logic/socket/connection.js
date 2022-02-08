/* On Connection */

const connection = (io, socket, username) => {
    const acc = JSON.parse(JSON.stringify(global.users[username]));
    socket.join("map_" + acc.pos.map);
    socket.emit("player", acc);
    delete acc.password;
    delete acc.id;
    delete acc.inventory;
    
    socket.broadcast.to("map_" + acc.pos.map)
    global.world[acc.pos.map].pjs[username] = acc;
    socket.emit("map", global.world[acc.pos.map]);
};

module.exports = connection;