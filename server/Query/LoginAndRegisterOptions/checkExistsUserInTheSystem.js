const { db } = require("../../db/db");

// check if user Exists before register
const checkExistsUserInTheSystem = async (userName) => {
  const [userIsExist] = await db.query(
    `SELECT userName FROM users where userName = ?`,
    [userName]
  );

  if (!userIsExist.length) {
    return false;
  }

  return true;
};
module.exports = checkExistsUserInTheSystem;
