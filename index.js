const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("mysql-promise")();

db.configure({
  host: "database-1.crurl47d1sgo.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "Password1",
  port: 3306,
  database: "final_project",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hell0");
});

app.get("/pathway", async (req, res) => {
  var data = [];

  const city = req.query.city;
  const restaurantType = req.query.restaurantType;
  const attractionType = req.query.attractionType;
  const mobility = req.query.mobility;
  const cuisine = req.query.cuisine;

  console.log(req.query.restaurantType);

  const sqlSelectEating =
    "SELECT * FROM eating_and_drinking WHERE city=? AND restaurant_type=? AND mobility_level=? and food_category=?";
  const sqlSelectAttractions =
    "SELECT * FROM attractions WHERE city=? AND attraction_type=? AND mobility_level=?";

  db.query(
    sqlSelectEating,
    [city, restaurantType, mobility, cuisine],
    (err, results1) => {
      if (err) {
        throw err;
      }
      // console.log(results1);
      data.push(results1);
    }
  );

  db.query(
    sqlSelectAttractions,
    [city, attractionType, mobility],
    (err, results2) => {
      if (err) {
        throw err;
      }

      data.push(results2);
      console.log(data);
      res.send(data);
    }
  );

  const [results] = await db.query(sqlSelect, [city, restaurantType, mobility]);

  return res.status(200).json(results);
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

module.exports = app;
