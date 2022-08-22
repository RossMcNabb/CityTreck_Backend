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

  var data =[];

  const city = req.query.city;
  const restaurantType = req.query.restaurantType;
  const attractionType = req.query.attractionType;
  const mobility = req.query.mobility;
  const cuisine = req.query.cuisine;

  console.log(req.query.restaurantType[0])

  const sqlSelectEating ="SELECT * FROM eating_and_drinking WHERE city=? AND mobility_level=? and food_category=? AND restaurant_type=? or ? or ?";
  const sqlSelectAttractions = "SELECT * FROM attractions WHERE city=? AND attraction_type=? AND mobility_level=?";
   
    db.query(sqlSelectEating, [city, mobility,cuisine, restaurantType[0],restaurantType[1],restaurantType[2]], (err, results1) => {
      if (err) {
        throw err;
      }
  
      data.push(results1)
    });
    db.query(sqlSelectAttractions, [city, attractionType, mobility], (err, results2) => {
    if (err) {
      throw err;
    }

 data.push(results2)
console.log(data)
res.send(data)
});
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
