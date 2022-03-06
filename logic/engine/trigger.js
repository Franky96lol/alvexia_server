/* Trigger Engine */

const config = require("../../config.js");

const Trigger = {
    /* On Change Area
     * @params Socket(io)
     * @params Socket(socket)
     * @params String(username)
     * @params String(trigger) */
    ca: async function (io, socket, username, trigger) {
        trigger = trigger.split("&");
        const pos = {
            map : trigger[0],
            x : parseInt(trigger[1].split("_")[0]) * 100,
            y : parseInt(trigger[1].split("_")[1]) * 100,
            angle : 0,
            last_step : new Date().getTime()
        };
        const acc = global.users[username];
        socket.broadcast.to("map_" + acc.pos.map).emit("del_pj", username);
        delete global.world[acc.pos.map].pjs[username];
        socket.leave("map_" + acc.pos.map);
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
                speed: _stats.stats.speed
            },
            size: acc.size,
            skin: acc.skin,
            pos: pos
        };
        global.users[username].pos = pos;
        await socket.join("map_" + pos.map);
        socket.broadcast.to("map_" + pos.map).emit("new_pj", {
            username: username, pjstats: pjstats
        });
        global.world[pos.map].pjs[username] = pjstats;
        socket.emit("load_map", global.world[pos.map]);
    }
}

module.exports = Trigger;