const app = require("express").Router();
const User = require("../model/User");

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  let savedUser = await user.save();
  res.status(200).send(savedUser);
});

module.exports = app;
