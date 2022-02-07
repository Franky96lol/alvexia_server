const config = require("../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");

function verifyMail(req, res) {
  if (!req.params && !req.params.user && !req.param.id) {
    return;
  }
  let username = req.params.user;
  let id = req.params.id;

  if (!fs.existsSync(config.DB + "/accounts/" + username + ".json")) {
    return { message: "No exist" };
  }

  let acc = helper.readFile(config.DB + "/accounts/" + username + ".json");
  if (acc.verified == true) return { message: "already verified" };
  if (acc.id != id) return { message: "wrong url" };
  acc.verified = true;
  acc.subscribed = true;

  helper.writeFile(config.DB + "/accounts/" + username + ".json", acc);
  return { message: "verified" };
}

module.exports = verifyMail;
