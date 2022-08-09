const express = require("express");
const app = express();
const mysql = require("mysql")

const db = mysql.createPool({
    host: 'database-1.crurl47d1sgo.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Password1',
    database:'final_project'

});
db.getConnection(function(err){
    if (err) throw err;
    console.log('connection successful')
});
app.get("/", (req,res)=>{
 res.send("Hell0")

})
app.post("/",(req,res) =>{
const sqlInsert = "INSERT INTO pubs_bars_restaurants (name,City) VALUES ('Lerpwl','Liverpool');"
db.query(sqlInsert, (err, result)=>{
    if (err) throw err;
    console.log(result);
})
});

app.listen(3001,()=>{
    console.log("running on port 3001")
});