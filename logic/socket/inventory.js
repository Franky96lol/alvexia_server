/* On Inventory*/

const config = require("../../config.js");
const inv = require(config.LOGIC + "/engine/inventory.js");

async function inventory(io , socket , username){
    await socket.on("inventory" , async function (data){
        switch(data){
            case "armory":
                socket.emit("armory" , await inv.armory(username));
                return;
                break;
            case "consumables":
                socket.emit("consumables" , await inv.consumables(username));
                return;
                break;
            case "materials":
                socket.emit("materials" , await inv.materials(username));
                return;
                break;
            default :
                return;
                break;
        };
    });
}