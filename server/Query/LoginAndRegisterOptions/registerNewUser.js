const { db } = require("../../db/db");

// check if user Exists before register
const registerNewUser = async (UserName, firstName, lastName, password) => {
  try {
    const [{ affectedRows }] = await db.query(
      `INSERT INTO users (UserName, firstName, lastName, password) VALUES (?, ?, ?,?)`,
      [UserName, firstName, lastName, password]
    );

    return affectedRows;
  } catch (error) {
    console.error(error.sqlMessage);
	return [{}]
  }
};

module.exports = { registerNewUser };
