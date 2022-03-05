/* Chat Socket */

const config = require("../../config.js");
const ChatEngine = new (require(config.LOGIC + "/engine/chat.js"))();
ChatEngine.load();
const admin = require(config.LOGIC + "/engine/admin.js");

async function chat (io , socket , username) {
    await ChatEngine.loadChat(io , username , socket);
    /* On Message */
    /* @params String(type) 
     * @params String(room)
     * @params String(typem)
     * @params String(message)
     */
    await socket.on("message" , async function (data){
        data = data.split("&");
        if(data[3] == "/gm"){
            await admin.gm(io , socket , username , ChatEngine);
            return;
        }
        await ChatEngine.send(io , data[0] , data[1], username , global.users[username].nickname , data[2] , data[3]);
    });
    /* On Join Channel */
    /* @params String(room) */
    await socket.on("join" , async function (room) {
        await ChatEngine.join(username , room);
    });
    /* On Leave Channel */
    /* @params String(room) */
    await socket.on("leave" , async function (room) {
        await ChatEngine.leave(username , room);
    });
    /* On Join Private Channel */
    /* @params String(username2) */
    await socket.on("joinPrivate" , async function(username2) {
        await ChatEngine.joinPrivate(io , username , username2);
    });
    /* On Leave Private Channel */
    /* @params String(room) */
    await socket.on("leavePrivate" , async function (room) {
        await ChatEngine.leavePrivate(io , username , room);
    });
};

module.exports = {chat , ChatEngine};