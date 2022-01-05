const express = require("express");
const cors = require("cors");
const path = require("path");

const { vacation } = require("./Routers/vacations");
const { users } = require("./Routers/users");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api/user", users);
app.use("/api/vacation", vacation);
// app.use(express.static("build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./build", "/index.html"));
// });
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});
app.listen(port, () =>
  console.log(`Example app listening on port port! ${port}`)
);
