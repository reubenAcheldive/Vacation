const { db } = require("../db/db");

const chartVacation = async () => {
  try {
    const [result] = await db.query(
      ` SELECT idVacation, COUNT(idVacation) amount FROM followers
      GROUP BY idVacation`
    );

    return result;
  } catch (error) {
    return [];
  }
};
module.exports = { chartVacation };
