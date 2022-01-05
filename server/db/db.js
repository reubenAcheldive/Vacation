const mysql = require("mysql2/promise");
const sqlSettings = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123123123",
  database: "vacation",
};

console.log(
  "setting up connection to MySQL with the following settings:",
  sqlSettings
);
const db = mysql.createPool(sqlSettings);

module.exports = {
  db,
};
