const { Router } = require("express");

const expressJwt = require("express-jwt");

const { checkValidateAdmin } = require("../middleware/requestAdmin");

const {
  createNewVacation,
} = require("../Query/AdminOptions/createNewVacation");
const { deleteVacation } = require("../Query/AdminOptions/deleteVacation");
const { editVacation } = require("../Query/AdminOptions/editVacation");
const {
  deleteFollowVacationById,
} = require("../Query/HandelOptionsOfUser/deleteFollowVacationById");
const {
  vacationChooseByUser,
} = require("../Query/HandelOptionsOfUser/vacationChooseByUser");
const {
  checkFavoriteNotDuplicate,
} = require("../Query/HandelOptionsOfUser/createUserNameForFavoriteVacation ");
const {
  createUserNameFavoriteVacation,
} = require("../Query/HandelOptionsOfUser/createUserNameForFavoriteVacation ");
const {
  deleteUserNameForFavoriteVacation,
} = require("../Query/HandelOptionsOfUser/deleteUserNameForFavoriteVacation");
const {
  getAllVacationsExceptEspeciallyUser,
} = require("../Query/HandelOptionsOfUser/getAllVacationsExceptEspeciallyUser");
const { setNewFollow } = require("../Query/HandelOptionsOfUser/setNewFollow");

const { chartVacation } = require("./chartVacation");

const Route = Router();
const JWT_Secret = "Rouven";
const verifyJwtMiddleware = expressJwt({
  secret: JWT_Secret,
  algorithms: ["HS256"],
});
Route.use(
  verifyJwtMiddleware.unless({
    path: [],
  })
);

Route.post("/create-new-vacation", checkValidateAdmin, async (req, res) => {
  const { description, price, checkIn, checkOut, img, destination } = req.body;

  console.log({ description, price, checkIn, checkOut, img, destination });
  if (!description || !price || !checkIn || !checkOut || !img || !destination)
    return res.status(403).send("you must prevent all fields !!!");
  const result = await createNewVacation(
    description,
    price,
    checkIn,
    checkOut,
    img,
    destination
  );
  if (result) return res.status(200).send({ successes: result });
});

Route.delete("/delete-vacation/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(403).send("field as missing ");
  const idIsNumber = Number(id);
  if (!idIsNumber) return res.status(404).send("id is not a number");
  await deleteFollowVacationById(id);
  const result = await deleteVacation(id);

  if (!result) return res.status(400).send({ successes: result });
  res.status(200).send(`delete was succeeded`);
});

Route.put("/edit-vacation", checkValidateAdmin, async (req, res) => {
  const { description, price, checkIn, checkOut, id, img, destination } =
    req.body;
  
  try {
    if (!description || !price || !checkIn || !checkOut || !id || !destination)
      return res.status(403).send("field as missing ");
    const result = await editVacation(
      description,
      price,
      checkIn,
      checkOut,
      id,
      img,
      destination
    );

    if (!result) return res.status(400).send({ successes: result });
    res.status(200).send(`update  was succeeded`);
  } catch (e) {
    console.log(e);
  }
});
Route.post("/set-new-follow", async (req, res) => {
  const { follow, id } = req.body;
 
  try {
    if (!id) return res.status(403).send("field is missing ");
    const result = await setNewFollow(follow, id);

    if (!result) return res.status(400).send({ successes: result });
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
  }
});

Route.post("/add-new-favorite-vacation", async (req, res) => {
  try {
    const { idVacation, userName } = req.body;
   
    if (!userName || !idVacation)
      return res.status(401).send("field as missing ");
    const checkVacation = await checkFavoriteNotDuplicate(idVacation, userName);

    if (checkVacation) {
      const results = await createUserNameFavoriteVacation(
        idVacation,
        userName
      );

      res.send({ successes: true, results });
    } else {
      return res.status(401).send({ successes: false });
    }
  } catch (error) {
    console.log({ error });
  }
});

Route.delete("/delete-favorite-vacation", async (req, res) => {
  try {
    const { idVacation, userName } = req.body;

    if (!userName || !idVacation)
      return res.status(401).send("field as missing ");
    const deletedLikeVacation = await deleteUserNameForFavoriteVacation(
      idVacation,
      userName
    );
    if (!deletedLikeVacation) return res.status(401).send("deleted was Felid");

    return res.status(200).send("deleted was successes");
  } catch (error) {
    console.log({ error });
  }
});

Route.post("/get-All-Vacation-especially-user", async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) return res.status(401).send("field as missing ");

    const results = await getAllVacationsExceptEspeciallyUser(userName);

    res.send(results);
  } catch (error) {
    console.log({ error });
  }
});

Route.get("/get-graph-ids", async (req, res) => {
  const result = await chartVacation();
  res.send({ result });
});
module.exports = { vacation: Route };
