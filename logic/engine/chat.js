/* Chat Engine*/

const fs = require("fs");
const config = require("../../config.js");

class ChatEngine{
    constructor(){
        this.chat = {
            global = [],
            comerce = [],
            system = [],
            staff = [],
            party = {},
            private = {}
        }
    }
    
    load(){
        const chats = fs.readdirSync(config.DB + "/chats/");
        for(let chat of chats){
            
        }
    }
};

module.exports = ChatEngine;