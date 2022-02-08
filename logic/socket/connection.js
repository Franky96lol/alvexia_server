/* On Connection */

const connection = (io, socket, username) => {
    const acc = JSON.parse(JSON.stringify(global.users[username]));
    const pjstats = {
        
    };
    socket.join("map_" + acc.pos.map);
    socket.emit("player", acc);
    socket.broadcast.to("map_" + acc.pos.map).emit("new_pj" , acc);
    global.world[acc.pos.map].pjs[username] = acc;
    socket.emit("load_map", global.world[acc.pos.map]);
};

module.exports = connection;