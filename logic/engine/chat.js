/* Chat Engine*/

const fs = require("fs");
const config = require("../../config.js");

class ChatEngine{
    constructor(){
        this.chats = {
            global = [],
            comerce = [],
            system = [],
            staff = [],
            partys = {},
            guilds = {},
            privates = {}
        }
    }
    
    load(){
 
        for(let _chat in this.chats){
            this.chats[_chat] = JSON.parse(fs.readFileSync(config.DB + "/chats/" + _chat + ".json"));
        }
    }
};

module.exports = ChatEngine;