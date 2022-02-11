/* Game Engine */

const config = require("../config.js");
const saver = require(config.LOGIC + "/saver.js");
const wmg = require(config.LOGIC + "/engine/world_material_generator.js");

class Engine {
    constructor(io){
        this.io = io;
    }
    
    start(){
        saver.start();
        wmg.start(io);
    }
}

module.exports = Engine;