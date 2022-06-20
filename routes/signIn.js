const models = require("../models");
const bcrypt = require("bcrypt");
const validateCheck = require("../lib/validationCheck");

exports.signIn_get = (req, res) => {
  const error = req.session.error;
  res.render("./signIn", { err: error });
};

exports.signIn_post = async (req, res) => {
  try {
    if (validateCheck(req)) {
      res.redirect("/signIn");
      return;
    }
    const { email, password } = req.body;
    const compare = await models.User.compareMailPassword(email);
    if (!compare) {
      req.session.error = "メールアドレスまたはパスワードが不正です。";
      return res.redirect("/signIn");
    }
    let dbPass = "";
    compare.forEach((row) => {
      dbPass = row.password;
    });
    const compareded = await bcrypt.compare(password, dbPass);
    if (!compareded) {
      req.session.error = "メールアドレスまたはパスワードが不正です。";
      return res.redirect("/signIn");
    }
    req.session.isAuth = true;
    req.session.email = email;
    res.redirect("/home");
  } catch (error) {
    req.session.error = "認証できません。";
    return res.redirect("/signIn");
  }
};
