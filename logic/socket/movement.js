/* Movement Manager */

const config = require("../../config.js");

const movement = (io , socket , username) => {
    socket.on("move_pj" , async (data) => {
        const pos = global.users[username].pos;
       /* if(pos.last_step > (new Date().getTime() - (1000 / config.RATE.ms))){
            socket.disconnect();
            return;
        }
        global.users[username].pos.last_step = new Date().getTime();*/
        data = data.split("&");
        let pos_x = parseFloat(data[0]);
        let pos_y = parseFloat(data[1]);
        const tile_x = Math.floor(pos_x / 100);
        const tile_y = Math.floor(pos_y / 100);
        /* Collition */
        const tile = global.world[pos.map].objects[tile_x + "_" + tile_y];
        if(tile != undefined){
            if(tile.type == 0){
                return;
            }
        }

        global.users[username].pos.x = pos_x;
        global.users[username].pos.y = pos_y;
        global.world[pos.map].pjs[username].pos.x = pos_x;
        global.world[pos.map].pjs[username].pos.y = pos_y;
        
        await socket.broadcast.to("map_" + pos.map).emit("move_pj", username + "&" + pos_x + "&" + pos_y + "&" + 0);
        
    });
};

module.exports = movement;