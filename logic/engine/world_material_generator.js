/* Material generator */

const config = require("../../config");
const {TaskTimer} = require("tasktimer")

const timer = new TaskTimer(1000);
timer.add([{
    id: 'material_gen',
    tickInterval: config.RATE.material_gen,
    totalRuns: 0,
    callback(task) {
        material_generator();
    }
}]);

async function material_generator  (io) {
    for(let map in global.world){
        for(let obj in global.world[map].objects){
            if(global.world[map].objects[obj].ammount < global.world[map].objects[obj].max_ammount){
                global.world[map].objects[obj].ammount += 1;
            }
        }
    }
    console.log("Material Generated.")
};

function start () {
    timer.start();
};

function stop () {
    timer.stop();
};

module.exports = {start , stop};