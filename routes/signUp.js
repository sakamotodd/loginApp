const models = require("../models");
const bcrypt = require("bcrypt");
const validateCheck = require("../lib/validationCheck");

exports.signUp_get = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("./signUp", { err: error });
};

exports.signUp_Post = async (req, res) => {
  if (validateCheck(req)) {
    res.redirect("/signUp");
    return;
  }
  let pass = req.body.password;
  const exitEmailCheck = await models.User.existEmail(req.body.email);
  if (exitEmailCheck) {
    req.session.error =
      "同じメールアドレスがあります。別のメールアドレスで登録して下さい。";
    return res.redirect("/signUp");
  }
  let hashedPassword = await bcrypt.hash(pass, 10);
  const payload = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };
  await models.User.add(payload);
  req.session.isAuth = true;
  req.session.email = req.body.email;
  res.redirect("/home");
};
