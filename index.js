const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "database-1.crurl47d1sgo.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "Password1",
  port: 3306,
  database: "final_project",
});

db.getConnection(function (err) {
  if (err) throw err;
  console.log("connection successful");
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hell0");
});

app.get("/pathway", (req, res) => {
  const city = req.query.city;
  const restaurantType = req.query.restaurantType;
  //const cuisine = req.query.cuisine
  const mobility = req.query.mobility;

  const sqlSelect =
    "SELECT * FROM eating_and_drinking WHERE city=? AND restaurant_type=? AND mobility_level=?";

  db.query(sqlSelect, [city, restaurantType, mobility], (err, results) => {
    if (err) {
      throw err;
    }

    return res.status(200).json(results);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
