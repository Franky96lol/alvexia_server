/* Movement Manager */

const config = require("../../config.js");

const movement = (io , socket , username) => {
    socket.on("move" , (data) => {
        const pos = global.users[username].pos;
        const move_speed = 1;
        if(pos.last_step > (new Date().getTime() - 1000)){
            return;
        }
        global.users[username].pos.last_step = new Date().getTime();
        const x = Math.floor(data.x / 100 * move_speed);
        const y = Math.floor(data.y / 100 * move_speed);
        
        const pos_x = pos.x += x;
        const pos_y = pos.y += y;
        
        global.users[username].pos.x = pos_x;
        global.users[username].pos.y = pos_y;
        global.world[pos.map].pjs[username].pos.x = pos_x;
        global.world[pos.map].pjs[username].pos.y = pos_y;
        
        io.to("map_" + pos.map).emit("move_pj", {
            username : username,
            pos : global.users[username].pos
        })
        
    });
};

module.exports = movement;