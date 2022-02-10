/* Socket Routes*/
const config = require("../config.js");

const socketing = (io , socket , username) => {
    require(config.LOGIC + "/socket/connection.js")(io, socket , username);
    require(config.LOGIC + "/socket/disconnect.js")(io , socket , username);
    require(config.LOGIC + "/socket/movement.js")(io , socket , username);
};

module.exports = socketing;