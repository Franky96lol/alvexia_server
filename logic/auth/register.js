const config = require("../../config.js");
const fs = require("fs");
const uid = require(config.LOGIC + "uid.js");
const bcrypt = require("bcryptjs");


const register = (req, res) => {

    let username,
    email,
    password,
    rpassword,
    token;
    try {
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;
        rpassword = req.body.rpassword;
        _package = req.body._package;
    } catch (err) {
        res.json({
            status: false,
            data:
            "Ups! \nOcurrio un error al intentar crear la cuenta.\nError: " + err +
            "\n\nPor favor, si el problema persiste reportelo."
        });
    }

    if (_package != config._PACKAGE)
        res.json({
        status: false,
        message: "Esta usando una aplicación obsoleta o de terceros. Verifique."
    });
    if (username == undefined)
        res.json({
        status: false,
        message: "El nombre de usuario  no puede estar vacio."
    });

    if (email == undefined)
        res.json({
        status: false, message: "El correo no puede estar vacio."
    });

    if (password == undefined)
        res.json({
        status: false,
        message: "La contraseña no puede estar vacia."
    });

    if (global.users[username] != undefined)
        res.json({
        status: false,
        message: "Esta cuenta se encuentra en uso.\nIntente otro nombre."
    });

    if (password.length < 8)
        res.json({
        status: false,
        message: "La contraseña debe tener al menos 8 caracteres."
    });
    if (password != rpassword)
        res.json({
        status: false,
        message: "Las contraseñas insertadas no coinciden."
    });

    if (!validateEmail(email))
        res.json({
        status: false,
        message: "El correo insertado no posee un formato valido."
    });

    if (existsEmail(email))
        res.json({
        status: false,
        message: "El correo insertado ya se encuentra en uso. Intente otro."
    });

    const char = /^[a-zA-Z0-9]+$/;
    if (!char.test(username)) {
        res.json({
            status: false,
            message: "El nombre de usuario posee caracteres invalidos. Solo puede usar caracteres de la a-Z y 0-9."
        });
    }

    const account = {
        id: "",
        username: "",
        nickname: "",
        email: "",
        password: "",
        guild: "",
        level: 1,
        xp: 0,
        gold: 0,
        gems: 0,
        color: "",
        friend: {
            list: [],
            request: [],
            invites: []
        },
        mails: [],
        inventory: [],
        attributes: {
            points: 0,
            phy_attack: 0,
            mgc_attack: 0,
            attack_speed: 0,
            crit: 0,
            dodge: 0,
            phy_armor: 0,
            mgc_armor: 0,
            hp: 0,
            hp_reg: 0,
            mp: 0,
            mp_reg: 0,
            move_speed: 0
        },
        equiped: {
            first_hand: "na",
            second_hand: "na",
            shoulders: "na",
            neck: "na",
            trinket: "na",
            chest: "na",
            gloves: "na"
            ring: "na",
            bracers: "na",
            boots: "na",
            skin: "na",
            mount: "na"
        },
        isOnCombat: false,
        isOnMenu: false,
        suscribed: false,
        verified: false,
        acclevel: 1 //0 = baneado , 1 = usuario regular , 2 = maestro , 3 = moderador , 4 = admin
    };
    account.id = uid.alphanum(12);
    account.username = username;
    account.nickname = "apj_" + uid.num(6);
    account.color = generateColor();
    account.email = email;
    account.password = bcrypt.hashSync(password, 10);


    try {
        global.users[username] = account;

        setEmail(email);
        const nodemailer = require("nodemailer");
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "fireshoot.dev@gmail.com",
                pass: "hnm4Pz9h"
            }
        });

        const message = {
            from: "fireshoot-team@email.com",
            to: email,
            subject: "Verificación de Cuenta.",
            text:
            "Para verificar su cuenta siga el link:\n" +
            config.URL +
            "/auth/verifyMail/" +
            username +
            "/" +
            account.id
        };

        transport.sendMail(message, function(err, info) {
            if (err) {} else {}
        });

        res.json({
            status: true,
            message: "Se a registrado correctamente."
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: "error",
            message:
            "Ups! \nA ocurrido un error.\nSi este error persite , por favor reportelo.",
            error: err
        });
    }
}

const generateColor = () => {
    const randomColor = (
        Math.floor(Math.random() * (16777215 - 5000000)) + 5000000
    ).toString(16);
    return randomColor;
};

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const existsEmail = (_email) => {
    let emails = fs.readFileSync(config.DB + "/emails.json",
        "utf-8");

    for (let email of emails) {
        if (email == _email) return true;
    }
    return false;
}

const setEmail = (_email) => {
    let emails = fs.readFileSync(config.DB + "/emails.json", "utf-8");

    emails.push(_email);
    fs.writeFile(config.DB + "/emails.json", emails, "utf-8");
}

module.exports = register;