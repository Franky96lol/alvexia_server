/* World Map Generator */

const config = require("../../config.js");
const uid = require(config.LOGIC + "/uid.js")
const fs = require("fs");

const generate = (map, mmap) => {
    console.time("Map Generated in");
    for (let y = 0; y < map; y++) {
        for (let x = 0; x < map; x++) {
            let map = {
                name: "",
                pos: {
                    x: x,
                    y: y
                },
                size: {
                    x: mmap,
                    y: mmap
                },
                biome: "nature",
                type: "neutral",
                terrain: {},
                objects: {},
                triggers : {},
                npcs: {},
                pjs: {}
            };
            if(map.pos.x == 0 && map.pos.y == 0){
                map.triggers["49_1"] = {
                    t : "ca",
                    tr : "1_0&0_1"
                }
            }
            
            fs.writeFileSync(config.DB + "/maps/" + x + "_" + y + ".json", JSON.stringify(map), "utf-8");
            }
        }
        console.timeEnd("Map Generated in");
    }

    module.exports = generate;