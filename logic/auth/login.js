const config = require("../../config.js");
const fs = require("fs");
const authenticator = require("./authenticator.js");
const bcrypt = require("bcryptjs");

/* function login
* @Method : POST
* @param req {body : {username , password , app_token}}
* @param res {}
*/

async function login (req, res) {
    if (!req.body) return;
    let username,
    password,
    token;
    try {
        username = req.body.username;
        password = req.body.password;
        token = req.body.app_token;
    } catch (err) {
        res.json({
            status: false,
            data: "DATA_ERROR",
            error: err
        });
        return;
    }

    if (token != config.APPTOKEN) {
        res.json({
            status: false,
            data: "WRONG_APP_TOKEN"
        });
        return;
    }


    if (global.users[username] == undefined) {
        res.json({
            status: false,
            data: "WRONG_USER"
        });
        return;
    }

    const account = await global.users[username];

    if (!bcrypt.compareSync(password, account.password)) {
        res.json({
            status: false,
            data: "WRONG_USER"
        });
        return
    }

    if (account.id == null || account.id == undefined) {
        res.json({
            status: false,
            data: "ACC_ERROR"
        });
        return;
    }
    res.json({
        status: true,
        data: authenticator.generate(account.id)
    });
}

module.exports = login;