const { db } = require("../../db/db");

const createUserNameFavoriteVacation = async (idVacation, userName) => {
  // query if userName and password match in Data base
  try {
    const [result] = await db.query(
      `INSERT INTO followers (idVacation, userName) VALUES (?,?)`,
      [idVacation, userName]
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};

const checkFavoriteNotDuplicate = async (idVacation, userName) => {
  // query if userName and password match in Data base
  try {
    const [result] = await db.query(
      `SELECT * FROM followers where idVacation=? and userName=?`,
      [idVacation, userName]
    );
    console.log(result.length <0);
    const checkResult = result.length >0 ? false : true;
   
    return checkResult;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { checkFavoriteNotDuplicate, createUserNameFavoriteVacation };
