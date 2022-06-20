const { check } = require("express-validator/check");

module.exports = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("は必須項目です。")
    .isEmail()
    .withMessage("のフォーマットが違います"),
];
