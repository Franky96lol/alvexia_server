/* Assets Loader */

const fs = require("fs");
const config = require("../config.js");

/* Loading users from database to server */
const users = () => {
    const accounts = fs.readdirSync(config.DB + "/accounts/");
    for (let acc of accounts) {
        global.users[acc.replace(".json" , "")] = fs.readFileSync(config.DB + "/accounts/" + acc , "utf-8");
    }
};

module.exports = {
    users
};