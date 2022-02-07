const config = require("../../config.js");
const fs = require("fs");
const authenticator = require("./authenticator.js");
const bcrypt = require("bcryptjs");

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
            message:
            "Ups!\nA ocurrido un error. Si este problema continua , reportelo.",
            error: err
        });
    }

    if (token != config.APPTOKEN)
        return {
        status: false,
        message: "Esta usando una aplicación obsoleta o de terceros. Verifique."
    };

    //comprobamos si existe el usuario
    if (!fs.existsSync(config.DB + "/accounts/" + username + ".json"))
        return {
        status: false,
        message: "Nombre de usuario o contraseña incorrectos."
    };
    //si existe almacenamos los datos momentaneamente
    let account = helper.readFile(config.DB + "/accounts/" + username + ".json");
    if (!account) return {
        status: false,
        message: "Ups! \nOcurrio un error"
    };
    //comprobamos si las contraseñas coinciden
    if (!bcrypt.compareSync(password, account.password))
        return {
        status: false,
        message: "Nombre de usuario o contraseña incorrectos."
    };
    //si las contraseñas coinciden damos acceso al usuario
    //comprobamos si la cuenta tiene un id
    if (account.id == null || account.id == undefined)
        return {
        status: false,
        message: "La cuenta se encuentra corrupta. Reporte este error."
    };
    return {
        status: true,
        message: authenticator.generateToken(account.id)
    };
}

module.exports = login;