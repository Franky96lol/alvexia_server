/* Chat Socket */

const config = require("../../config.js");
const ChatEngine = new require(config.LOGIC + "/engine/chat.js")();
ChatEngine.load();

const chat = (io , socket , username) => {
    ChatEngine.loadChat(io , username , socket);
    
    socket.on("message" , async (data) => {
        await ChatEngine.send()
    });
};

module.exports = chat;