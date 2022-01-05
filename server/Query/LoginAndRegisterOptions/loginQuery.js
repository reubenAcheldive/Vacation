const { db } = require("../../db/db");

const loginQuery = async (userName) => {
  // query if userName and password match in Data base
  try {
    const [login] = await db.query(`SELECT * FROM users where userName = ?`, [
      userName,
    ]);

    return login;
  } catch (error) {
    console.log(error);
    return [];
  }
};
module.exports = { loginQuery };
