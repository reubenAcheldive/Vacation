const { db } = require("../../db/db");

async function setNewFollow(follow, Id) {
 try {
  const [{ affectedRows }] = await db.query(
    `UPDATE vacation SET follow = ? WHERE (Id = ?)`,
    [follow, Id]
  );
console.log({affectedRows});
  const isUpdated = affectedRows > 0;

  return isUpdated;
 } catch (error) {
   console.log({error});
 }
 
}
module.exports = { setNewFollow };
