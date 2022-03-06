/* Stadistics Calculator */
const config = require("../../config.js");

const stats_per_attr = {
    sta : {
        hp : 5,
        hp_reg : 0.05,
        mp : 5,
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
        mgc_def : 0.1,
        crit : 0.035
    },
    luck : {
        extra_gold : 0.05,
        extra_xp : 0.05,
        extra_drop : 0.05
    }
}

const pos_attr = ["sta" , "str" , "agi" , "int" , "luck"];
const pos_stats = ["hp" , "hp_reg" , "mp" , "mp_reg" , "phy_dmg" , "phy_def" , "mgc_dmg" , "mgc_def" , "crit" , "dodge" , "extra_gold" , "extra_xp" , "extra_drop"];

async function statscalc (username) {
    let base_attr = {
        sta: 0,
        str: 0,
        agi: 0,
        int: 0,
        luck: 0
    };
    let base_stats = {
        hp : 50,
        hp_reg : 1,
        mp : 50,
        mp_reg : 1,
        phy_dmg : 5,
        phy_def : 1,
        mgc_dmg : 5,
        mgc_def : 1,
        crit : 1,
        dodge : 1,
        speed : config.RATE.mov_speed,
        extra_gold : 0,
        extra_xp : 0,
        extra_drop : 0
    };
    const acc = global.users[username];
    const attr = acc.attributes;
    //const _status = acc.status;
    const equipment = acc.equiped;
    
    for (let a in base_attr){
        base_attr += await attr[a];
    }

    for (let equip in equipment) {
        for (let a in global.items[equipment[equip].id]) {
            if(pos_attr.includes(a)){
                base_attr += await global.items[equipment[equip].id][a];
            }else if (pos_stats.includes(a)){
                base_stats += await global.items[equipment[equip].id][a];
            }
        }
    }
    
    for (let a in base_attr){
        for (let b in stats_per_attr[a]){
            base_stats[b] += await (stats_per_attr[a][b] * base_attr[a]);
        }
    }
    
    console.log(base_stats);
    
    const xp = Math.floor(Math.pow((acc.level + 4), 3));
    global.stats[username] = {
        attr : base_attr,
        stats : base_stats,
        xp : xp
    };

};

module.exports = statscalc;