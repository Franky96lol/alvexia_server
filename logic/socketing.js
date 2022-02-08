/* Socket Routes*/
const config = require("../config.js");
const socketing = (io , socket , username) => {
    require(config.LOGIC + "/socket/connection.js")(io, socket , username);
};

module.exports = socketing;