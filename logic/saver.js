/* Accounts and Assets saving function */

const config = require("../config.js");
const {TaskTimer} = require("tasktimer");
const fs = require("fs");

const timer = new TaskTimer(1000);
timer.add([{
    id: 'users_save',
    tickInterval: config.RATE.users_save,
    totalRuns: 0,
    callback(task) {
        users_save();
    }
}, {
    id: "world_save",
    tickInterval : config.RATE.world_save,
    totalRuns : 0,
    callback(task) {
        world_save();
    }
}]);

function users_save () {
    console.time("Accounts database saved in");
    for(let user in global.users){
        fs.writeFile(config.DB + "/accounts/" + user + ".json" , JSON.stringify(global.users[user]) , ()=>{});
    }
    console.timeEnd("Accounts database saved in");
};

function world_save (){
    console.time("World saved in");
    for(let map in global.world){
        fs.writeFile(config.DB + "/maps/" + map + ".json" , JSON.stringify(global.world[map]), ()=>{});
    }
    console.timeEnd("World saved in");
};

function start () {
    timer.start();
};

function stop () {
    timer.stop();
};

module.exports = {start , stop};