exports.passReset_get = (req, res, next) => {
  const error = req.session.error;
  res.render("passReset", {
    token: req.params.token,
    email: req.query.email,
    err: error,
  });
};
