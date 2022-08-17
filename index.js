const express = require("express");
const app = express();
const mysql = require("mysql");
const axios = require("axios");

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

app.get("/attraction/{city}", (req, res) => {
  res.send("Hell0");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
