const { db } = require("../../db/db");

const editVacation = async (description, price, checkIn, checkOut, id, img) => {
    console.log({description, price, checkIn, checkOut, id, img});
    try {
        const [{ affectedRows }] = await db.query(
            `UPDATE vacation SET description = ?, price = ?, checkIn = ?, checkOut = ? , img = ? WHERE (id = ?)`,
            [description, price, checkIn, checkOut, img, id]
        );

        const result = affectedRows > 0 ? true : false;

        return affectedRows, result;
    } catch (error) {
        console.log(error);
        return [null,null]
    }
};

module.exports = { editVacation };
