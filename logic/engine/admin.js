/* Admin Panel */

const config = require("../../config.js");

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
}
module.exports = {
    gm
};