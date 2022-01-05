const { db } = require("../../db/db");

const checkLoginAdmin = async (userName) => {
  
  const [userIsExist] = await db.query(
    `SELECT * FROM users where userName = ? and  isAdmin=1 `,
    [userName]
  );
  console.log(userIsExist);
  if (!userIsExist.length) {
    console.log(0);
    return false;
  }
  console.log(1);
  return true;
};
module.exports = {checkLoginAdmin};
