/* Movement Manager */

const config = require("../../config.js");

const movement = (io , socket , username) => {
    socket.on("move_pj" , (data) => {
        const pos = global.users[username].pos;
        const move_speed = 1;
        if(pos.last_step > (new Date().getTime() - config.RATE.ms)){
            socket.disconnect();
            return;
        }
        global.users[username].pos.last_step = new Date().getTime();

        let pos_x = data.x;//parseInt(pos.x + x);
        let pos_y = data.y;//parseInt(pos.y + y);

        global.users[username].pos.x = pos_x;
        global.users[username].pos.y = pos_y;
        global.world[pos.map].pjs[username].pos.x = pos_x;
        global.world[pos.map].pjs[username].pos.y = pos_y;
        
        io.to("map_" + pos.map).emit("move_pj", username + "&" + pos_x + "&" + pos_y + "&" + 0);
        
    });
};

module.exports = movement;