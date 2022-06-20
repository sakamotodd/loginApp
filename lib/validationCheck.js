const { validationResult } = require("express-validator/check");

function validateCheck(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let msgArray = [];
    errors.errors.forEach((val) => {
      msgArray.push(val.param + val.msg);
    });
    req.session.error = msgArray.join("\n");
    return true;
  }
}

module.exports = validateCheck;
