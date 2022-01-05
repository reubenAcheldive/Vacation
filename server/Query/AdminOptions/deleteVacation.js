const { db } = require("../../db/db");

const deleteVacation = async (id) => {
    console.log({ id });
    const [{ affectedRows }] = await db.query(
        `DELETE FROM vacation WHERE (Id = ?)`,
        [id]
    );
    console.log(affectedRows);

    const result = affectedRows > 0 ? true : false;

    return affectedRows, result;
};

module.exports = { deleteVacation };
