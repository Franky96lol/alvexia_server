/* Game Engine */

const config = require("../config.js");
const saver = require(config.LOGIC + "/saver.js");

class Engine {
    constructor(){
        
    }
    
    start(){
        saver.start();
    }
}

module.exports = Engine;