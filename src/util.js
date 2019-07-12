const bcrypt = require("bcrypt");

const encryptPassword = password => {
  return bcrypt.hashSync(password, 10);
};

const decryptPassword = (password = '', hashPassword) =>{
  return bcrypt.compareSync(password, hashPassword)
}

module.exports.encryptPassword = encryptPassword;
module.exports.decryptPassword = decryptPassword;
