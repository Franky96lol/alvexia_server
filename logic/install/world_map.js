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
                npcs: {},
                pjs: {}
            };
            for (let _y = 0; _y < mmap; _y ++) {
                for (let _x = 0; _x < mmap; _x ++) {
                    if (_y == 0 || _y == (mmap-1) &&
                        _x == 0 || _x == (mmap - 1)) objects[uid.alphanum(4)] = {
                        name: "tree_1",
                        faction: "silver_legion",
                        amount: 1000,
                        c_amount: 1000,
                        type: "ind",
                        pos: {
                            x: _x,
                            y: _y
                        }

                    }
                }
                fs.writeFileSync(config.DB + "/maps/" + x + "_" + y + ".json", JSON.stringify(map), "utf-8");
            }
        }
        console.timeEnd("Map Generated in");
    }

    module.exports = generate;