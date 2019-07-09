const app = require("express").Router();
const User = require("../model/User");
const { registerValidaion } = require("../validations/user");

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Validations
  let { error } = registerValidaion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("This email is already registred!");

  try {
    let savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = app;
