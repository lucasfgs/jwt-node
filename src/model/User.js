const mongoose = require("../config/database");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, min: 8 }
});

module.exports = mongoose.model("User", userSchema);
