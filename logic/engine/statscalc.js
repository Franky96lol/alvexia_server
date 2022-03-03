/* Stadistics Calculator */
const config = require("../../config.js");

const stats_per_attr = {
    hp : {
        hp : 10,
        hp_reg : 0.05
    },
    mp : {
        mp : 10,
        mp_reg : 0.05
    },
    str : {
        hp : 2,
        phy_dmg : 1,
        phy_def : 0.1,
        crit : 0.025
    },
    agi : {
        phy_dmg : 1,
        phy_def : 0.05,
        crit : 0.05,
        dodge : 0.025
    },
    int : {
        mp : 2,
        mgc_dmg : 1,
        mgc_def : 0.01,
        crit : 0.035
    },
    luck : {
        extra_gold : 0.05,
        extra_xp : 0.05,
        extra_drop : 0.05
    }
}

function statscalc (username) {
    const base_attr = {
        hp: 0,
        mp: 0,
        str: 0,
        agi: 0,
        int: 0,
        luck: 0
    };
    const base_stats = {
        hp : 0,
        hp_reg : 0,
        mp : 0,
        mp_reg : 0,
        phy_dmg : 0,
        phy_def : 0,
        mgc_dmg : 0,
        mgc_def : 0,
        crit : 0,
        dodge : 0,
        extra_gold : 0,
        extra_xp : 0,
        extra_drop : 0
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