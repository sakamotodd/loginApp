const models = require("../models");
require("dotenv").config();
const nodemailer = require("nodemailer");
const validateCheck = require("../lib/validationCheck");
const crypto = require("crypto");


const APP_KEY = "YOUR-SECRET-KEY";
const APP_URL = "http://localhost:3000/password/reset/";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
});

exports.forget_get = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("./forget", { err: error });
};

exports.forget_post = async (req, res) => {
  try {
    if (validateCheck(req)) {
      res.redirect("/forget");
      return;
    }
    const email = req.body.email;
    const compare = await models.User.compareMailPassword(email);
    if (!compare) {
      req.session.error = "メールアドレスまたはパスワードが不正です。";
      return res.redirect("/signIn");
    }
    const randomStr = Math.random().toFixed(36).substring(2, 38);
    const token = crypto
      .createHmac("sha256", APP_KEY)
      .update(randomStr)
      .digest("hex");
    const passwordResetUrl =
      APP_URL + "/forget" + token + "?email=" + encodeURIComponent(email);
    await models.User.passwordReset(email, token);
    // メール送信
    transporter.sendMail(
      {
        from: "stalogynote@gmail.com",
        to: email,
        subject: "パスワード再発行メール",
        text:
          "以下のURLをクリックしてパスワードを再発行してください。\n\n" +
          passwordResetUrl,
      },
      function (error, info) {
        // エラー発生時
        if (error) {
          req.session.error = error.message;
        } else {
          req.session.error = info.messageId;
        }
      }
    );
    return res.redirect("/forget");
  } catch (error) {
    req.session.error = "最初からやり直して下さい。";
    return res.redirect("/forget");
  }
};
