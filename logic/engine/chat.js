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
            party = {},
            private = {}
        }
    }
    
    load(){
 
        for(let _chat in this.chats){
            this.chats[_chat]
        }
    }
};

module.exports = ChatEngine;