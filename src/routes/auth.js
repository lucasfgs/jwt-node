const app = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const { encryptPassword, decryptPassword } = require("../util");
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
    let result = await User.findById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    if (decryptPassword(req.body.password, user.password))
      res.status(200).send(token);
    else res.status(400).send("Incorrect password");
  } else res.status(400).send("Email not found");
});

app.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: encryptPassword(req.body.password)
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
    if (err) res.status(400).send(err);
    res.status(200).send("User removed successfully");
  });
});

app.put("/:id", async (req, res) => {
  try {
    let updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        password: encryptPassword(req.body.password),
        name: req.body.name,
        email: req.body.email
      }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = app;
