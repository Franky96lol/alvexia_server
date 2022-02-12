/* Movement Manager */

const config = require("../../config.js");

const movement = (io , socket , username) => {
    socket.on("move_pj" , (data) => {
        const pos = global.users[username].pos;
        const move_speed = 1;
        if(pos.last_step > (new Date().getTime() - config.RATE.ms)){
            return;
        }
        global.users[username].pos.last_step = new Date().getTime();
        const x = (data.x / 100 * move_speed);
        const y = (data.y / 100 * move_speed);
        
        const pos_x = (pos.x + x).toFixed(1);
        const pos_y = (pos.y + y).toFixed(1);
        
        global.users[username].pos.x = pos_x;
        global.users[username].pos.y = pos_y;
        global.world[pos.map].pjs[username].pos.x = pos_x;
        global.world[pos.map].pjs[username].pos.y = pos_y;
        
        io.to("map_" + pos.map).emit("move_pj", {
            username : username,
            pos : {
                x : pos_x,
                y : pos_y,
                angle : 180
            }
        })
        
    });
};

module.exports = movement;