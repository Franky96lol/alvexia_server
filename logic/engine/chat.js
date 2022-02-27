/* Chat Engine*/

const fs = require("fs");
const config = require("../../config.js");
const {
    TaskTimer
} = require("tasktimer");

class ChatEngine {
    constructor() {
        this.chats = {
            global: [],
            comerce: [],
            system: [],
            staff: [],
            partys: {},
            guilds: {},
            privates: {}
        }
    }
    /* Load Chats from db*/
    load() {
        console.time("Chats loaded in ");
        for (let _chat in this.chats) {
            this.chats[_chat] = JSON.parse(fs.readFileSync(config.DB + "/chats/" + _chat + ".json"));
        }
        console.timeEnd("Chats loaded in ");
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

};

module.exports = ChatEngine;