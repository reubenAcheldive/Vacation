const { Router } = require("express");
const Route = Router();
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const jsonwebtoken = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const promiseFideSing = promisify(jsonwebtoken.sign);
const { handelDecodeJwt } = require("../decode-token");
const salt = bcrypt.genSaltSync(2);
const JWT_Secret = "Rouven";
const verifyJwtMiddleware = expressJwt({
  secret: JWT_Secret,
  algorithms: ["HS256"],
});

Route.use(
  verifyJwtMiddleware.unless({
    path: ["/api/user/register", "/api/user/login"],
  })
);

const {
  registerNewUser,
} = require("../Query/LoginAndRegisterOptions/registerNewUser");
const { loginQuery } = require("../Query/LoginAndRegisterOptions/loginQuery");

Route.get("/auth", async (req, res) => {
  const token = req.header("authorization").split(" ")[1];

  console.log({ token });
  const tokenAfterDecoded = await handelDecodeJwt(token, JWT_Secret);
  console.log({ tokenAfterDecoded });

  const jwt = await createJwt(
    tokenAfterDecoded.userName,
    tokenAfterDecoded.isAdministrator ? true : false
  );
  res.send({ tokenAfterDecoded, jwt });
});

Route.post("/register", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  console.log(req.body);
  if (!userName || !firstName || !lastName || !password)
    return res.status(401).send("all field must required");

  const encryptedUserPassword = await bcrypt.hash(password, salt);
  console.log({ encryptedUserPassword });
  const [user] = await loginQuery(userName);
  console.log(user);
  if (user)
    return res.status(404).send({ user: "is already exists in the system" });
  const result = await registerNewUser(
    userName,
    firstName,
    lastName,
    encryptedUserPassword
  );
  if (result) {
    const jwt = await createJwt(userName, false);
    res.status(200).send({ jwt, userName, isAdministrator: false });
  }
});

Route.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  try {
    if (!userName || !password)
      return res.status(401).send("all field must required");

    const [user] = await loginQuery(userName);
    const isAdministrator = user.isAdmin;
    console.log(isAdministrator);

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    const jwt = await createJwt(userName, isAdministrator ? true : false);

    if (passwordIsCorrect) {
      res.status(200).send({ jwt, userName, isAdministrator });
    } else {
      res.status(404).send({ error: "The user and password don't match" });
    }
  } catch (error) {
    res.status(404).send({ error: "The user and password don't match" });
  }
});

module.exports = { users: Route };

async function createJwt(userName, isAdministrator) {
  return promiseFideSing({ userName, isAdministrator }, JWT_Secret);
}
