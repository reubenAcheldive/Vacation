const { db } = require('../../db/db');
const vacationChooseByUser = async (userName) => {
  const [results] = await db.query(
    `select description,Id, price, checkIn, checkOut, follow,destination from ((followers inner join vacation on idVacation = Id  ) inner join users on followers.userName = users.userName) where users.userName = ?`,
    [userName]
  );
  console.log({ results });
  return results;
};

module.exports ={ vacationChooseByUser};
