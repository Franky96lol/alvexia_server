/* Chat Engine*/

const fs = require("fs");
const config = require("../../config.js");
const {
    TaskTimer
} = require("tasktimer");

class ChatEngine {
    constructor(io) {
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
        this.io = io;
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
    send(type,room,username,nickname,typem,message) {

        if (type == "privates" || type == "guilds" || type == "partys" || type == "zones") {
            this.chats[type][room].push(
                username + "&" +
                nickname + "&" +
                typem + "&" +
                message
            );
        } else {
            this.chats[room].push(
                username + "&" +
                nickname + "&" +
                typem + "&" +
                message
            );
        }
        this.io.to(room).emit("message" , username + "&" +
            nickname + "&" +
            typem + "&" +
            message);
    }

};

module.exports = ChatEngine;