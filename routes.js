const { Router } = require("express");

module.exports = new Router().get("/", (req, res) => {
  res.render("home.ejs");
});