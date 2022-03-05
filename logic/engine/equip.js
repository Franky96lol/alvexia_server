/*Equip Engine*/

async function equip(username , item , slot){
    if(slot == undefined || slot == null){
        const acc = global.users[username];
        const sta = global.stats[username].concat({level : acc.level});
        const item = global.items[acc.armory[item].id]
    }else{
        
    }
}