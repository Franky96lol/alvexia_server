/* Chat Engine */

const config = require("../../config.js");

const chat = (io , socket , username) => {
    socket.on("message" , (data) => {
        io.to(data.room).emit("message" , {
            room : data.room,
            from : global.users[username].nickname,
            type : data.type,
            message : data.message
        });
    });
};

module.exports = chat;