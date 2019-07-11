const bcrypt = require("bcrypt");

const encryptPassword = password => {
  return bcrypt.hashSync(password, 10);
};

module.exports.encryptPassword = encryptPassword;
