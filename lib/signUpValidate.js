const { check } = require("express-validator/check");

module.exports = [
  check("username").not().isEmpty().withMessage("必須項目です。"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("は必須項目です。")
    .isEmail()
    .withMessage("のフォーマットが違います"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("は必須項目です。")
    .isLength({ min: 6 })
    .withMessage("は6文字以上入力してください。"),
];
