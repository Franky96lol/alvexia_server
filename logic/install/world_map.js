/* World Map Generator */

const fs = require("fs");

const generate = (map , mmap) => {
    for(let y = 0 ; y < map ; y++){
        for(let x = 0 ; x < map ; x++){
            let map = {
                name : "",
                pos : {
                    x : x,
                    y : y
                },
                size : {
                    x : mmap,
                    y : mmap
                },
                biome : "nature"
                terrain : []
            };
        }
    }
}

module.exports = generate;