const { db } = require('../../db/db');

const deleteFollowVacationById = async (id) => {
  const [{ affectedRows }] = await db.query(
    `DELETE FROM followers WHERE (idVacation = ?)`,
    [id]
  );

  const result = affectedRows > 0 ? true : false;

  return affectedRows, result;
};

module.exports = { deleteFollowVacationById };
