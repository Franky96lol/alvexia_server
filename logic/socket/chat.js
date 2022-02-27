/* Chat Socket */

const config = require("../../config.js");
const ChatEngine = new require(config.LOGIC + "/engine/chat.js")();

const chat = (io , socket , username) => {
    socket.on("message" , async (data) => {
        await io.to(data.room).emit("message" , {
            room : data.room,
            from : global.users[username].nickname,
            type : data.type,
            message : data.message
        });
    });
};

module.exports = chat;