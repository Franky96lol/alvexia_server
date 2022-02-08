/* Assets Loader */

const fs = require("fs");
const config = require("../config.js");

/* Loading users from database to server */
const users = () => {
    const accounts = fs.readdirSync(config.DB + "/accounts/");
    for (let acc of accounts) {
        global.users[acc.replace(".json", "")] = JSON.stringify(fs.readFileSync(config.DB + "/accounts/" + acc, "utf-8"));
    }
};

/* Loading world from database to server */
const world = () => {
    const worlds = fs.readdirSync(config.DB + "/maps/");
    for (let map of worlds) {
        global.world[map.replace(".json", "")] = JSON.stringify(fs.readFileSync(config.DB + "/maps/" + map, "utf-8"));
    }
};

module.exports = {
    users,
    world
};