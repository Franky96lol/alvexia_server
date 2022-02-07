const config = require("../../config.js");
const verifyMail = (req, res) => {
    if (!req.params && !req.params.user && !req.param.id) {
        res.json({
            status: false, message: "error"
        });
        return;
    }
    let username = req.params.user;
    let id = req.params.id;

    if (global.users[username] == undefined) {
        res.json({
            status: false, message: "No exist"
        });
        return;
    }

    if (global.users[username].verified == true) return {
        message: "already verified"
    };
    if (global.users[username].id != id) {
        res.json({
            status: false,
            message: "wrong url"
        })};
    global.users[username].verified = true;
    global.users[username].subscribed = true;
    res.json({
        status: true, message: "verified"
    });
}

module.exports = verifyMail;