const config = require("../../config.js");
const fs = require("fs");
const authenticator = require("./authenticator.js");
const bcrypt = require("bcryptjs");

/* function login
* @Method : POST
* @param req {body : {username , password , token}}
* @param res {}
*/

const login = (req, res) => {
    if (!req.body) return;
    let username,
    password,
    token;
    try {
        username = req.body.username;
        password = req.body.password;
        token = req.body.token;
    } catch (err) {
        res.json({
            status: false,
            data:
            "Ups!\nA ocurrido un error. Si este problema continua , reportelo.",
            error: err
        });
        return;
    }

    if (token != config.APPTOKEN) {
        res.json({
            status: false,
            data: "Esta usando una aplicación obsoleta o de terceros. Verifique."
        });
        return;
    }


    if (global.users[username] == undefined) {
        res.json({
            status: false,
            data: "Nombre de usuario o contraseña incorrectos."
        });
        return;
    }

    const account = global.users[username];

    if (!bcrypt.compareSync(password, account.password)) {
        res.json({
            status: false,
            data: "Nombre de usuario o contraseña incorrectos."
        });
        return
    }

    if (account.id == null || account.id == undefined) {
        res.json({
            status: false,
            data: "La cuenta se encuentra corrupta. Reporte este error."
        });
        return;
    }
    res.json({
        status: true,
        data: authenticator.generate(account.id)
    });
}

module.exports = login;