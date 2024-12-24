const jwt = require("jsonwebtoken");
//genarate token using user id
const genarateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", //adeclare token expire date
  });
};
module.exports = genarateToken;