const { db } = require("../../db/db");

async function createNewVacation(
  description,
  price,
  checkIn,
  checkOut,
  img,
  destination
) {
  const queryResult = await db.query(
    "INSERT INTO vacation (description, price, checkIn, checkOut,img,destination) VALUES (?, ?, ?, ?,?,?)",
    [description, price, checkIn, checkOut, img, destination]
  );
  const { affectedRows } = queryResult[0];
  const isUpdated = affectedRows > 0;

  return isUpdated;
}
module.exports = { createNewVacation };
