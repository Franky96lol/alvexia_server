/* Stadistics Calculator */
const config = require("../../config.js");

const statscalc = (username){
    const acc = JSON.parse(JSON.stringify(global.users[username]));
    delete acc.attributes.points;
    const attr = acc.attributes;
    const status = acc.status;
    const equipment = acc.equipment;
};

module.exports = statscalc;