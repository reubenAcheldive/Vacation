const { decode } = require("jsonwebtoken");

async function handelDecodeJwt(token, SECRET) {
  const decodedJwt = await decode(token, SECRET);
  return decodedJwt;
}
module.exports = { handelDecodeJwt };
