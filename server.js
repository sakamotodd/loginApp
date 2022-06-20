const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const signIn = require("./routes/signIn");
const signUp = require("./routes/signUp");
const home = require("./routes/home");
const index = require("./routes/index");
const logout = require("./routes/logout");
const forget = require("./routes/forget");
const passReset = require("./routes/passwordReset");
const validateSignIn = require("./lib/signInValidate");
const validateSignUp = require("./lib/signUpValidate");
const validateForget = require("./lib/forgetValidate");
const app = express();
const PORT = 3000;

const ses_opt = {
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 0.5 * 1000,
  },
};
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/other", require("./routes/other.js"));
app.use(flash());
app.use(express.json());
app.use(session(ses_opt));
app.use(express.urlencoded({ extended: true }));
app.get("/", index.index_get);
app.get("/signIn", signIn.signIn_get);
app.post("/signIn", validateSignIn, signIn.signIn_post);
app.get("/signUp", signUp.signUp_get);
app.post("/signUp", validateSignUp, signUp.signUp_Post);
app.get("/home", home.home_get);
app.post("/logout", logout.logout_post);
app.get("/forget", forget.forget_get);
app.post("/forget", validateForget, forget.forget_post);
app.get("/forget/:token", passReset.passReset_get);

app.listen(PORT);
