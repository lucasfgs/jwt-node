const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () =>
  console.log("Conectado com o banco de dados!")
);

module.exports = mongoose;
