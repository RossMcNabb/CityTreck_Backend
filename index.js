const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("mysql-promise")();

const path = require("path");

const args = process.argv.slice(2)[0];

const envFile = args === "test" ? "./.env.test" : "./.env";

require("dotenv").config({ path: path.join(__dirname, envFile) });

const { DB_PASSWORD, DB_HOST } = process.env;

db.configure({
  host: DB_HOST,
  user: "admin",
  password: DB_PASSWORD,
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
  try {
    const city = req.query.city;
    const restaurantType = Array.isArray(req.query.restaurantType)
      ? req.query.restaurantType
      : [req.query.restaurantType];
    const attractionType = Array.isArray(req.query.attractionType)
      ? req.query.attractionType
      : [req.query.attractionType];
    const mobility = req.query.mobility;
    const cuisine = Array.isArray(req.query.cuisine)
      ? req.query.cuisine
      : [req.query.cuisine];

    const sqlSelectEating =
      "SELECT * FROM eating_and_drinking WHERE city=? AND mobility_level=? AND (restaurant_type=? or restaurant_type= ? or restaurant_type=?) AND (food_category=? or food_category=? or food_category=? or food_category=? or food_category=? or food_category=? or food_category=? or food_category=?)";
    const sqlSelectAttractions =
      "SELECT * FROM attractions WHERE city=? AND mobility_level=? AND attraction_type=? or ? or ? ";

    const [results1] = await db.query(sqlSelectEating, [
      city,
      mobility,
      restaurantType[0],
      restaurantType[1],
      restaurantType[2],
      cuisine[0],
      cuisine[1],
      cuisine[2],
      cuisine[3],
      cuisine[4],
      cuisine[5],
      cuisine[6],
      cuisine[7],
    ]);

    const [results2] = await db.query(sqlSelectAttractions, [
      city,
      mobility,
      attractionType[0],
      attractionType[1],
      attractionType[2],
    ]);

    const results = [...results1, ...results2];
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

module.exports = app;
