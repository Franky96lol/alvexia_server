/* Inventory Engine */

const config = require("../../config.js");

async function armory(username){
    let armory = {};
    for await(const item of global.users[username].armory){
        armory[item] = await global.items[item];
    }
    return {bags : global.users[username].bags , items : armory};
}

async function consumables(username){
    let consumables = {};
    for await(const item of global.users[username].consumables){
        consumables[item] = await global.items[item];
    }
    return {bags : global.users[username].bags , items : consumables};
}

async function materials(username){
    let materials = {};
    for await(const item of global.users[username].materials){
        materials[item] = await global.items[item];
    }
    return {bags : global.users[username].bags , items : materials};
}


async function skins(username){
    return "skins";
}

module.exports = {
    armory,
    consumables,
    materials,
    skins
}