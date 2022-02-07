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
    APPTOKEN: "mmm", 
    server: { version: "v0.0.1" }
 }; 
 
 module.exports = config;