/* Socket On Connection */
const config = require("../../config.js");
const statscalc = require(config.LOGIC + "/engine/statscalc.js");

async function connection (io, socket, username) {
    const acc = global.users[username];
    await statscalc(username);
    const _stats = global.stats[username];
    const pjstats = {
        nickname: acc.nickname,
        status: {
            level: acc.level,
            xp: _stats.xp,
            c_xp: acc.xp,
            hp: _stats.stats.hp,
            mp: _stats.stats.mp,
            c_hp: acc.status.hp,
            c_mp: acc.status.mp,
            speed : _stats.stats.speed
        },
        size : acc.size,
        skin : acc.skin,
        pos: acc.pos
    };
    socket.join("map_" + acc.pos.map);
    socket.broadcast.to("map_" + acc.pos.map).emit("new_pj", {
        username: username, pjstats: pjstats
    });
    global.world[acc.pos.map].pjs[username] = pjstats;
    socket.emit("load_map", global.world[acc.pos.map]);
    global.users[username].isOnline = true;
    return;
};

module.exports = connection;