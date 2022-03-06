/* Admin Panel */

const config = require("../../config.js");
const Trigger = require(config.LOGIC + "/engine/trigger.js");

class Admin {
    constructor(ChatEngine) {
        this.ChatEngine = ChatEngine;
    }

    async gm(io, socket, username) {
        if (config.STAFF.moderator.includes(username)) {
            if (global.users[username].acclevel < 4) {
                global.users[username].acclevel = 4;
                await socket.emit("gm", "on");
                await this.ChatEngine.send(io, "staff", "staff", "Sistema", "Sistema", "text", "El usuario " + username + " activo el modo gm (" + global.users[username].acclevel + ")");
                return;
            } else {
                global.users[username].acclevel = 1;
                await socket.emit("gm", "off");
                await this.ChatEngine.send(io, "staff", "staff", "Sistema", "Sistema", "text", "El usuario " + username + " desactivo el modo gm (" + global.users[username].acclevel + ")");
                return;
            }
        } else if (config.STAFF.moderator.includes(username)) {
            if (global.users[username].acclevel < 3) {
                global.users[username].acclevel = 3;
                await socket.emit("gm", "on");
                await this.ChatEngine.send(io, "staff", "staff", "Sistema", "Sistema", "text", "El usuario " + username + " activo el modo gm (" + global.users[username].acclevel + ")");
                return;
            } else {
                global.users[username].acclevel = 1;
                await socket.emit("gm", "off");
                await this.ChatEngine.send(io, "staff", "staff", "Sistema", "Sistema", "text", "El usuario " + username + " desactivo el modo gm (" + global.users[username].acclevel + ")");
                return;
            }
        }
    }
    
    async tele(io , socket , username , coords){
        if(global.user[username].acclevel < 3) return;
        coords = (coords.split("&").length >= 2 ? coords : coords += "&1_1");
        await Trigger["ca"](io , socket , username , coords);
        await this.ChatEngine.send(io, "staff", "staff", "Sistema", "Sistema", "text", "El usuario " + username + " se ah teletransportado a Map:" + coords.split("&")[0] + " pos:" + coords.split("&")[1]);
        return;
    }
    
    async ban(io , socket , username , banned){
        if(global.user[username].acclevel < 3) return;
        if(global.user[banned] != undefined && !config.STAFF.admins.includes(banned)){
            global.user[banned].acclevel = 0;
            await this.ChatEngine.send(io, "staff", "staff", "Sistema", "Sistema", "text", "El usuario " + banned + " ah sido baneado por " + username );
            return;
        }
    }
}
module.exports = Admin;