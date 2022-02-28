const config = require("../../config.js");
const fs = require("fs");
const uid = require(config.LOGIC + "/uid.js");
const bcrypt = require("bcryptjs");

/* Funtion register
* @params req{ body : {username , email , password , rpassword , token}}
* @params res {}
*/

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
        token = req.body.app_token;
    } catch (err) {
        res.json({
            status: false,
            data: "DATA_ERROR"
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

    if (username == undefined) {
        res.json({
            status: false,
            data: "EMPTY_USER"
        });
        return;
    }

    if (email == undefined) {
        res.json({
            status: false, 
            data: "EMPTY_MAIL"
        });
        return;
    }

    if (password == undefined) {
        res.json({
            status: false,
            data: "EMPTY_PASS"
        });
        return;
    }

    if (global.users[username] != undefined) {
        res.json({
            status: false,
            data: "ACC_USED"
        });
        return;
    }

    if (password.length < 8) {
        res.json({
            status: false,
            data: "PASS_LENGTH"
        });
        return;
    }

    if (password != rpassword) {
        res.json({
            status: false,
            data: "PASS_MATCH"
        });
        return;
    }

    if (!validateEmail(email)) {
        res.json({
            status: false,
            data: "WRONG_MAIL"
        });
        return;
    }

    if (existsEmail(email)) {
        res.json({
            status: false,
            data: "MAIL_USED"
        });
        return;
    }

    const char = /^[a-zA-Z0-9]+$/;
    if (!char.test(username)) {
        res.json({
            status: false,
            data: "USERNAME_BAD_CHAR"
        });
        return;
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
        pos : config.PSTART,
        size : config.HERO_SIZE,
        skills : {
            melee : {
                level : 1,
                xp : 0
            },
            range : {
                level : 1,
                xp : 0
            },
            magic : {
                level : 1,
                xp : 0
            }
        },
        gold: 0,
        gems: 0,
        color: "",
        friend: {
            list: [],
            request: [],
            invites: []
        },
        mails: [],
        bags : 2,
        armory: [],
        consumables : [],
        materials: [],
        spells : [],
        skins : ["hero_male_1" , "hero_female_1"],
        spells_buttons : {
            b1 : {
                id : "na",
                img : "na",
                level : 0,
                xp : 0,
                cd : 0
            },
            b2 : {
                id : "na",
                img : "na",
                level : 0,
                xp : 0,
                cd : 0
            },
            b3 : {
                id : "na",
                img : "na",
                level : 0,
                xp : 0,
                cd : 0
            }
        },
        action_buttons : {
            b1 : "na",
            b2 : "na",
            b3 : "na",
            b4 : "na",
            b5 : "na",
            b6 : "na",
            b7 : "na",
            b8 : "na"
        },
        status : {
            hp : 0,
            mp : 0,
            pbuff : [],
            nbuff : []
        },
        attributes: {
            points: 0,
            phy_attack: 0,
            mgc_attack: 0,
            attack_speed: 0,
            crit: 5,
            dodge: 5,
            phy_armor: 0,
            mgc_armor: 0,
            hp: 100,
            hp_reg: 5,
            mp: 50,
            mp_reg: 2.5,
            move_speed: 10,
            extra_gold : 0,
            extra_xp : 0
        },
        equiped: {
            first_hand: "na",
            second_hand: "na",
            shoulders: "na",
            neck: "na",
            trinket: "na",
            chest: "na",
            gloves: "na",
            ring: "na",
            bracers: "na",
            boots: "na",
            mount: "na"
        },
        skin : "hero_male_1",
        chats : {
            chats : ["global",
            "system","comerce"],
            party : "",
            guild : "",
            zone : "",
            privates : []
        },
        isOnline: false,
        lastTimeOnline: new Date().getTime(),
        isOnCombat: false,
        isOnMenu: false,
        isTrading: false,
        suscribed: false,
        verified: false,
        acclevel: 1 //0 = baneado , 1 = usuario regular , 2 = maestro , 3 = moderador , 4 = admin
    };
    account.id = uid.alphanum(12);
    account.username = username;
    account.nickname = "apj" + uid.num(6);
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
            "Para verificar su cuenta siga el siguiente link:\n" +
            config.URL +
            "/auth/verify/" +
            username +
            "/" +
            account.id
        };

        transport.sendMail(message, function(err, info) {
            if (err) {} else {}
        });

        res.json({
            status: true,
            data: "REGISTERED"
        });
        return;
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            data:
            "DATA_ERROR",
            error: err
        });
        return;
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
    let emails = JSON.parse(fs.readFileSync(config.DB + "/emails.json",
        "utf-8"));

    for (let email of emails) {
        if (email == _email) return true;
    }
    return false;
}

const setEmail = (_email) => {
    let emails = JSON.parse(fs.readFileSync(config.DB + "/emails.json", "utf-8"));

    emails.push(_email);
    fs.writeFileSync(config.DB + "/emails.json", JSON.stringify(emails), "utf-8");
}

module.exports = register;