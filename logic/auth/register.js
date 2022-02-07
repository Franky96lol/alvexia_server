const config = require("../../config.js");
const fs = require("fs");
const helper = require(config.LOGIC + "/helper.js");
const idGenerator = require(config.LOGIC + "/id.generator.js");
const bcrypt = require("bcryptjs");

//funcion de registro de usuario
function register(req, res, next) {

  let username, email, password, rpassword, token;
  try {
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    rpassword = req.body.rpassword;
    _package = req.body._package;
  } catch (err) {
    return {
      status : false,
      data :
        "Ups! \nOcurrio un error al intentar crear la cuenta.\nError: " + err + 
        "\n\nPor favor, si el problema persiste reportelo."
    };
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
    return { status: false, message: "El correo no puede estar vacio." };
  if (password == undefined)
    return {
      status: false,
      message: "La contraseña no puede estar vacia."
    };

  if (global.users[username] != undefined)
    return {
      status: false,
      message: "Esta cuenta se encuentra en uso.\nIntente otro nombre."
    };
  //si la cuenta no existe procedemos a verificar que los passwords coincidan y tengan la longitud minima
  if (password.length < 8)
    return {
      status: false,
      message: "La contraseña debe tener al menos 8 caracteres."
    };
  if (password != rpassword)
    return {
      status: false,
      message: "Las contraseñas insertadas no coinciden."
    };
  //si las contraseñas coinciden y tienen la longitud minima verificamos que el correo sea un correo valido
  if (!validateEmail(email))
    return {
      status: false,
      message: "El correo insertado no posee un formato valido."
    };
  //si es un correo valido verificamos que ya no exista una cuenta con ese correo
  if (existsEmail(email))
    return {
      status: false,
      message: "El correo insertado ya se encuentra en uso. Intente otro."
    };
  //si todo es correcto pasamos los valores a el modelo de la cuenta
  let char = /^[a-zA-Z0-9]+$/;
  if (!char.test(username)) {
    return {
      status: false,
      message: "El nombre de usuarios posee caracteres invalidos."
    };
  }
  //modelo basico de cuenta de usuario
  const account = {
    id: "",
    username: "",
    nickname: "",
    email: "",
    password: "",
    clan: "",
    level: 1,
    xp: 0,
    gold: 0,
    gems: 0,
    division: 0,
    stars: 0,
    stars_salve: 100,
    stars_rise: 0,
    credit: 100,
    color: "",
    friend: {
      list: [],
      request: [],
      invites: []
    },
    mails: [],
    matchs: [],
    inventory: [],
    bonus: {
      daily_chest: 0,
      star_chest: {
        stars: 0,
        time: 0
      },
      week_login: {
        day : 0,
        time : 0
      },
      hourly_bonus : {
        time : 0
      }
    }, 
    attributes : {
      points : 0,
      attack : 0,
      attack_speed : 0,
      crit : 0,
      reload_speed : 0,
      armor : 0,
      hp : 0,
      move_speed : 0
    },
    equiped: {
      first_weapon : "na",
      second_weapon : "na",
      armor : "na",
      boots : "na",
      skin: "na"
    },
    isOnRoom : false,
    isFindingMatch: false,
    isPlaying: false,
    firstEnter: false,
    suscribed: false,
    verified: false, //cuenta verificada (por defecto false)
    acclevel: 1 //0 = baneado , 1 = usuario regular , 2 = maestro , 3 = moderador , 4 = admin
  };
  account.id = idGenerator(12); //generamos el id unico de 12 caracteres alfanumericos
  account.username = username;
  account.nickname = "fpj_" + idGenerator(6);
  account.color = generateColor();
  account.email = email;
  account.password = bcrypt.hashSync(password, 10); //generamos un hash para mayor proteccion de la contraseña

  //escribimos en la base de datos los datos del usuario
  try {
    helper.writeFile(config.DB + "/accounts/" + username + ".json", account);

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
      if (err) {
      } else {
      }
    });

    //si se escribe correctamente hacemos saber al usuario de que se ah registrado correctamente
    return { status: true, message: "Se a registrado correctamente." };
  } catch (err) {
    //capturamos si ocurre un error y lo enviamos a la consola y al usuario (esperemos nunca llegar aqui)
    console.log(err);
    return {
      status: "error",
      message:
        "Ups! \nA ocurrido un error.\nSi este error persite , por favor reportelo.",
      error: err
    };
  }
}

const generateColor = () => {
  const randomColor = (
    Math.floor(Math.random() * (16777215 - 5000000)) + 5000000
  ).toString(16);
  return randomColor;
};
//funcion para validar que un correo tenga el formato apropiado
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//funcion para verificar que un correo no esta en uso
function existsEmail(_email) {
  let emails = helper.readFile(config.DB + "/emails.json");

  for (let email of emails) {
    if (email == _email) return true;
  }
  return false;
}

//funcion para insertar el nuevo correo de usuario en la lista de correos
function setEmail(_email) {
  let emails = helper.readFile(config.DB + "/emails.json");

  emails.push(_email);
  helper.writeFile(config.DB + "/emails.json", emails);
}

module.exports = register;
