/* Accounts and Assets saving function */

const config = require("../config.js");
const {TaskTimer} = require("tasktimer");
const fs = require("fs");

const timer = new TaskTimer(1000);
timer.add([{
    id: 'users_save',
    tickInterval: 60,
    totalRuns: 0,
    callback(task) {
        
    }
}, {
    id: "world_save",
    tickInterval : 60,
    totalRuns : 0,
    callback(task) {
        
    }
}]);

const users_save = () => {
    
};

const start = () => {
    timer.start();
};

const stop = () => {
    timer.stop();
};