const { db } = require("../../db/db");

const deleteUserNameForFavoriteVacation = async (idVacation, userName) => {
  console.log({ idVacation, userName });
  const [{ affectedRows }] = await db.query(
    `DELETE FROM followers WHERE idVacation = ? and userName = ?`,
    [idVacation, userName]
  );

  const result = affectedRows > 0 ? true : false;

  return result;
};

module.exports = { deleteUserNameForFavoriteVacation };
