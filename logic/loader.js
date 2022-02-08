/* Assets Loader */

const fs = require("fs");
const config = require("../config.js");

/* Loading users from database to server */
const users = () => {
    console.time("Users loaded in");
    const accounts = fs.readdirSync(config.DB + "/accounts/");
    for (let acc of accounts) {
        global.users[acc.replace(".json", "")] = JSON.stringify(fs.readFileSync(config.DB + "/accounts/" + acc, "utf-8"));
    }
    console.timeEnd("Users loaded in");
};

/* Loading world from database to server */
const world = () => {
    console.time("World loaded in");
    const worlds = fs.readdirSync(config.DB + "/maps/");
    for (let map of worlds) {
        global.world[map.replace(".json", "")] = JSON.stringify(fs.readFileSync(config.DB + "/maps/" + map, "utf-8"));
    }
    console.timeEnd("World loaded in");
};

/* Loading items from database to server */
const items = () => {
    console.time("Itemd loaded in");
    const _items = fs.readdirSync(config.DB + "/items/");
    for (let item of _items) {
        global.items[item.replace(".json", "")] = JSON.stringify(fs.readFileSync(config.DB + "/items/" + item, "utf-8"));
    }
    console.timeEnd("Items loaded in");
};

module.exports = {
    users,
    world
};