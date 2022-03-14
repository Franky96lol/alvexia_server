/* Chat Engine*/

const fs = require("fs");
const config = require("../../config.js");
const {TaskTimer} = require("tasktimer");
const uid = require(config.LOGIC + "/uid.js");

class ChatEngine {
    constructor() {
        this.chats = {
            global: [],
            comerce: [],
            system: [],
            staff: [],
            zones: {},
            partys: {},
            guilds: {},
            privates: {}
        };
    }
    /* Load Chats from db*/
    load() {
        console.time("Chats loaded in ");
        for (let _chat in this.chats) {
            this.chats[_chat] = JSON.parse(fs.readFileSync(config.DB + "/chats/" + _chat + ".json"));
        }
        console.timeEnd("Chats loaded in ");
        //starting chat saving
        this.save();
    }
    /* Save Chats to db */
    save() {
        const timer = new TaskTimer(1000);
        timer.add([{
            id: 'save_chat',
            tickInterval: config.RATE.chat_save,
            totalRuns: 0,
            callback(task) {
                for (let _chat in this.chats) {
                    fs.writeFile(config.DB + "/chats/" + _chat + ".json", JSON.stringify(this.chats[_chat]), ()=> {});
                }
                console.log("Chats saved!")
            }
        }]);
        timer.start();
    }
    /* Send Message */
    async send(io,type,room,username,nickname,typem,message) {

        if (type == "privates" || type == "guilds" || type == "partys" || type == "zones") {
            if(this.chats[type][room].length > config.RATES.max_sms) this.chats[type][room].shift();
            this.chats[type][room].push(
                type + "&" +
                room + "&" +
                username + "&" +
                nickname + "&" +
                typem + "&" +
                message
            );
        } else {
            if(this.chats[room].length > config.RATES.max_gsms) this.chats[room].shift();
            this.chats[room].push(
                type + "&" +
                room + "&" +
                username + "&" +
                nickname + "&" +
                typem + "&" +
                message
            );
        }
        await io.to(room).emit("message" , 
            type + "&" +
            room + "&" +
            username + "&" +
            nickname + "&" +
            typem + "&" +
            message);
    }
    
    /* Load Chats */
    async loadChat(io , username , socket){
        let c = {};
        let _ch = global.users[username].chats;
        for(let _chat of _ch.globals){
            c["global"][_chat] = (this.chats[_chat]);
            socket.join(_chat);
        }
        for(let _chat of _ch.privates){
            c["privates"][_chat] = (this.chats["privates"][_chat]);
            socket.join(_chat);
        }
        
        if(_ch.party != ""){
            c["partys"] = (this.chats["partys"][_ch.party]);
            socket.join(_ch.party);
        }
        if(_ch.guild != "") {
            c["guilds"] = (this.chats["guilds"][_ch.guild]);
            socket.join(_ch.guild);
        }
        if(_ch.zone != ""){ 
            c["zones"] = (this.chats["zones"][_ch.zone]);
            socket.join(_ch.zone);
        }
        await socket.emit("load_chat" , c);
    }
    
    /* Join Chatroom */
    async join(io , username , room){
        if(!global.users[username].chats.chats.includes(room)) global.users[username].chats.chats.push(room);
        await io.sockets[username].join(room);
    }
    
    /* Leave Chatroom */
    async leave(io , username , room){
        if(global.users[username].chats.chats.includes(room)) {
            global.users[username].chats.chats.splice(global.users[username].chats.chats.indexOf(room) , 1);
        }
        await io.sockets[username].leave(room);
    }
    
    /* Join Private */
    async joinPrivate(io , username , username2){
        if(global.users[username2] == undefined) return;
        const id = uid.alphanum(5);
        io.sockets[username].join(id);
        global.users[username].chats.private.push(id);
        global.users[username2].chats.private.push(id);
        if(global.users[username2].isOnline) io.sockets[username2].join(id);
        this.chats.privates[id] = [
            "privates" + "&" +
            id + "&" +
            "Sistema" + "&" +
            "Sistema" + "&" +
            "text" + "&" +
            "El jugador " + global.users[username].nickname + " inicio un chat privado."
        ];
        await io.to(id).emit("message" , 
            "privates" + "&" +
            id + "&" +
            "Sistema" + "&" +
            "Sistema" + "&" +
            "text" + "&" +
            "El jugador " + global.users[username].nickname + " inicio un chat privado."
            
        );
    }
    
    /* Leave Private */
    async leavePrivate(io , username , room){
        io.sockets[username].leave(room);
        if(global.users[username].chats.privates[room] != undefined) {
            delete global.users[username].chats.privates[room];
        }
        if(this.chats.privates[room] != undefined) this.chats.privates[room].push(
            "privates" + "&" +
            room + "&" +
            "Sistema" + "&" +
            "Sistema" + "&" +
            "text" + "&" +
            "El jugador " + global.users[username].nickname + " abandono el chat."
            );
            await io.to(room).emit("message" , 
            "privates" + "&" +
            room + "&" +
            "Sistema" + "&" +
            "Sistema" + "&" +
            "text" + "&" +
            "El jugador " + global.users[username].nickname + " abandono el chat."
            
        )
        
    }

};

module.exports = ChatEngine;