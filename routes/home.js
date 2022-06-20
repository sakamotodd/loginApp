exports.home_get = (req, res) => {
  const email = req.session.email;
  res.render("./home");
};
