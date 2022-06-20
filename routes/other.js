const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("../views/other.ejs");
});
module.exports = router;
