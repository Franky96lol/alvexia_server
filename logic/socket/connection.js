/* On Connection */
const config = require("../../config.js");
const statscalc = require(config.LOGIC + "/engine/statscalc.js");

const connection = (io, socket, username) => {
    const acc = JSON.parse(JSON.stringify(global.users[username]));
    const _stats = statscalc(username);
    const pjstats = {
        nickname : acc.nickname,
        level : acc.level,
        xp : acc.xp,
        hp : _stats.attr.hp,
        mp : _stats.attr.mp,
        c_hp : _stats.status.hp,
        c_mp : _stats.status.mp,
        pos : acc.pos
    };
    socket.join("map_" + acc.pos.map);
    socket.emit("pjstats", pjstats);
    socket.broadcast.to("map_" + acc.pos.map).emit("new_pj" , pjstats);
    global.world[acc.pos.map].pjs[username] = pjstats;
    socket.emit("load_map", global.world[acc.pos.map]);
};

module.exports = connection;