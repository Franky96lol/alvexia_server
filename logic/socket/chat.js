/* Chat Socket */

const config = require("../../config.js");
const ChatEngine = new (require(config.LOGIC + "/engine/chat.js"))();
ChatEngine.load();
const admin = new (require(config.LOGIC + "/engine/admin.js"))(ChatEngine);

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
        /* If Admin 
         * Check for commands */
        if(global.users[username].acclevel >= 3){
            //God Mode
            if(data[3] == "/gm"){
                await admin.gm(io , socket , username);
                return;
            }
            //Teleport @params String(coords)
            else if(data[3].includes("/tele ") && data[3].split(" ").length == 2){
                await admin.tele(io , socket , username , data[3].split(" ")[1]);
                return;
            }
            //Ban User @params String(username)
            else if(data[3].includes("/ban ") && data[3].split(" ").length == 2){
                await admin.ban(io , socket , username , data[3].split(" ")[1]);
                return;
            }
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