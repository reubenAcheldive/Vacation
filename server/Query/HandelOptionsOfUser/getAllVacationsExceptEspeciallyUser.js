const { db } = require('../../db/db');

const getAllVacationsExceptEspeciallyUser = async (userName) => {
  const [results] = await db.query(
    `SELECT 
    V.*, F.idFollow  as followId
    FROM
    vacation V 
    left join followers  F
    on V.Id = F.idVacation
    where  F.userName =?
    union
    SELECT 
    V.*,0 as followId
    FROM
    vacation V 
    left join followers  F
    on V.Id = F.idVacation
    where v.id not in (select idVacation from followers where UserName=?) ;`,
    [userName, userName]
  );

  return results;
};
module.exports ={ getAllVacationsExceptEspeciallyUser};
