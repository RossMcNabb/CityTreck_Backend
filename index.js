const express = require("express");
const bodyParser = require ('body-parser')
const app = express();
const mysql = require("mysql");


const db = mysql.createPool({
  host: "database-1.crurl47d1sgo.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "Password1",
  database: "final_project",
});

db.getConnection(function (err) {
  if (err) throw err;
  console.log("connection successful");
});

app.get("/", (req, res) => {
  res.send("Hell0");
});

app.get("/api/get", (req, res) => {
  
  const city = "Manchester"
  const restType = "Bar"
  const cuisine = "European"
  const mobility ="Meduim"

  const sqlSelect = "SELECT * FROM eating_and_drinking where city=? and restaurant_type=?";

  db.query(sqlSelect, [city, restType, cuisine, mobility],(err,result) => {
    
   if (err) throw err;
    res.send(result);


  });
})

app.listen(3001, () => {
  console.log("running on port 3001");
});

