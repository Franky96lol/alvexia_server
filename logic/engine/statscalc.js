/* Stadistics Calculator */
const config = require("../../config.js");

const statscalc = (username) => {
    const acc = JSON.parse(JSON.stringify(global.users[username]));
    delete acc.attributes.points;
    const attr = acc.attributes;
    const status = acc.status;
    const equipment = acc.equiped;
    
    for(let equip in equipment){
        for(let a in attr){
            attr[a] += global.items[equipment[equip]][a];
        }
    }
    
    const exp = {
        xp : Math.floor(Math.pow((acc.level + 5) , 3))
    };
    
    return {
        attr,
        status,
        exp
    }
};

module.exports = statscalc;