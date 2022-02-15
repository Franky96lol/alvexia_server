/* Base Config */
const config = { 
    URL: "https://alvexia.com", 
    PORT: process.env.PORT || 8081, //port
    DIRNAME: __dirname, //root folder
    DB: __dirname + "/database", //database
    LOGIC: __dirname + "/logic", //logic 
    TOKEN: { 
        secret: "super_secret_token_keyword", 
        expire: "6h" 
    }, 
    RATE : {
        xp : 1,
        gold : 1,
        speed : 1,
        ms : 45,
        regen : 10,
        users_save : 60,
        world_save : 60,
        material_gen : 60
    },
    HERO_SIZE : "1_1",
    PSTART : {
        map : "0_0",
        x : 0,
        y : 0,
        angle : 180,
        last_step : new Date().getTime()
    },
    APPTOKEN: "La_6362kwjsbd&uwueb277291", 
    server: { version: "v0.0.1" }
 }; 
 
 module.exports = config;