/* Inventory Engine */

const config = require("../../config.js");

function armory(username){
    let armory = {};
    for(let item of global.users[username].armory){
        armory[item] = global.items[item];
    }
    return return {bags : global.users[username].bags , items : armory};
}

function consumables(username){
    let consumables = {};
    for(let item of global.users[username].consumables){
        consumables[item] = global.items[item];
    }
    return {bags : global.users[username].bags , items : consumables};
}

function materials(username){
    let materials = {};
    for(let item of global.users[username].materials){
        materials[item] = global.items[item];
    }
    return {bags : global.users[username].bags , items : materials};
}


function skins(username){
    return "skins";
}

module.exports = {
    armory,
    consumables,
    materials,
    skins
}