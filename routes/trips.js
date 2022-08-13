const express = require("express");
const router = express.Router();

module.exports = ({ addTrip, addTripAttractions, addTripToDos }) => {
  router.post("/", async (req, res) => {
    // add new trip to DB
    const newTrip = await addTrip(cityId);
    const promisesAttractions = attractions.map((attractions) => {
      // add attractions to DB
      addTripAttractions(newTrip.id, attraction.id);
    });
    const promisesToDos = todo.map((todo) => {
      addTripToDos(todo, newTrip.id);
    });

    await Promise.all(promisesAttractions, promisesToDos);
    res.send("ok");
  });
  return router;
};
