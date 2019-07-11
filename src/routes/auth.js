const app = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { registerValidaion } = require("../validations/user");

app.get("/", async (req, res) => {
  try {
    let result = await User.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let result = await User.findOne({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/register", async (req, res) => {
  // Cryptography password
  let hashedPassowd = bcrypt.hashSync(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassowd
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

app.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }, err => {
    if (err) res.status(400).send(error);
    res.status(200).send("User removed successfully");
  });
});

module.exports = app;
