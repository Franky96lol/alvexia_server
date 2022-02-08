/* Stadistics Calculator */
const config = require("../../config.js");

const statscalc = (username){
    const acc = JSON.parse(JSON.stringify(global.users[username]));
    delete acc.attributes.points;
    const attr = acc.attributes;
    const status = acc.status;
    const equipment = acc.equipment;
    
    for(let equip of equipment){
        for(let a in attr){
            attr[a] += global.items[equip][a];
        }
    }
    return {
        attr,
        status
    }
};

module.exports = statscalc;