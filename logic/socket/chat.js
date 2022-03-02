/* Chat Socket */

const config = require("../../config.js");
const ChatEngine = new require(config.LOGIC + "/engine/chat.js")();
ChatEngine.load();

const chat = (io , socket , username) => {
    ChatEngine.loadChat(io , username , socket);
    /* On Message */
    /* @params String(type) 
     * @params String(room)
     * @params String(typem)
     * @params String(message)
     */
    socket.on("message" , async (data) => {
        data = data.split("&");
        await ChatEngine.send(io , data[0] , data[1], username , global.users[username].nickname , data[2] , data[3]);
    });
    /* On Join Channel */
    /* @params String(room) */
    socket.on("join" , async (room) => {
        await ChatEngine.join(username , room);
    });
    /* On Leave Channel */
    /* @params String(room) */
    socket.on("leave" , async (room) => {
        await ChatEngine.leave(username , room);
    });
    /* On Join Private Channel */
    /* @params String(username2) */
    socket.on("joinPrivate" , async (username2) =>{
        await ChatEngine.joinPrivate(io , username , username2);
    });
    /* On Leave Private Channel */
    /* @params String(room) */
    socket.on("leavePrivate" , async (room) => {
        await ChatEngine.leavePrivate(io , username , username2);
    });
};

module.exports = chat;