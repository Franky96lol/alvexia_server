/* Stadistics Calculator */
const config = require("../../config.js");

function statscalc (username) {
    const base_stats = {
        hp: 0,
        mp: 0,
        str: 0,
        agi: 0,
        int: 0,
        luck: 0
    };
    const base_statistics = {
        
    };
    const acc = global.users[username];
    delete acc.attributes.points;
    const attr = acc.attributes;
    const status = acc.status;
    const equipment = acc.equiped;

    for (let equip in equipment) {
        for (let a in attr) {
            attr[a] += global.items[equipment[equip]][a];
        }
    }

    const exp = {
        xp: Math.floor(Math.pow((acc.level + 4), 3))
    };

    return {
        attr,
        status,
        exp
    }
};

module.exports = statscalc;