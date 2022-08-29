const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("mysql-promise")();
const path = require('path');
// const envFile = './.env';
// require('dotenv').config({
//   path: envFile,
// });
const { RDS_PASSWORD, RDS_DB_NAME, RDS_USERNAME, RDS_HOSTNAME, RDS_PORT,PORT } = process.env;



db.configure({
  host: RDS_HOSTNAME,
  user: RDS_USERNAME,
  password: RDS_PASSWORD,
  port: RDS_PORT,
  database: RDS_DB_NAME,
});




app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hell0");
});

app.get("/pathway", async (req, res) => {
  const city = req.query.city;
  const restaurantType = req.query.restaurantType;
  const attractionType = req.query.attractionType;
  const mobility = req.query.mobility;
  const cuisine = req.query.cuisine;

  const sqlSelectEating =
    "SELECT * FROM final_project.eating_and_drinking WHERE city=? AND mobility_level=? and (restaurant_type=? or restaurant_type= ? or restaurant_type=?) and (food_category=? or food_category=? or food_category=? or food_category=? or food_category=? or food_category=? or food_category=? or  food_category=? )";
  const sqlSelectAttractions =
    "SELECT * FROM final_project.attractions WHERE city=?  AND mobility_level=? AND attraction_type=? or ? or ? ";

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
  console.log(results2);
  const results = [...results1, ...results2];
  return res.status(200).json(results);
});

app.listen(PORT, () => {
  console.log("running on port 3001");
});

module.exports = app;
