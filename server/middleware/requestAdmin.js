const { checkLoginAdmin } = require("../Query/AdminOptions/checkLoginAdmin");

const checkValidateAdmin = async (req, res, next) => {
    const {userName } = req.body;
    const  validate = checkLoginAdmin(userName)
    if (!validate ) return res.send({ error: "only admin can Update the Vacation" })
    next()

}
module.exports = { checkValidateAdmin }
