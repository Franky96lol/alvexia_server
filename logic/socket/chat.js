/* Chat Socket */

const config = require("../../config.js");
const ChatEngine = new require(config.LOGIC + "/engine/chat.js")();
ChatEngine.load();

const chat = (io , socket , username) => {
    ChatEngine.loadChat(io , username , socket);
    /* On Message */
    /* @params String(type , room , typem , message) */
    socket.on("message" , async (data) => {
        data = data.split("&");
        await ChatEngine.send(io , data[0] , data[1], username , global.users[username].nickname , data[2] , data[3]);
    });
    
    socket.on("join" , async (room) => {
        await ChatEngine.join(username , room);
    });
    
    socket.on("leave" , async (room) => {
        await ChatEngine.leave(username , room);
    });
};

module.exports = chat;