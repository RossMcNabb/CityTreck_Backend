const express = require("express");
const router = express.Router();
const axios = require("axios");

module.exports = ({
  getCity,
  addCity,
  getAttractions,
  addAttractions,
  addVisit,
}) => {
  router.post("/getCityData", async (req, res) => {
    const cityName = req.body.userInput;
  });

  const { latitude, longitude } = cityData.attributes;

  const attractionPromises = allData["googleData"].map(async (item) => {
    if (item.user_ratings_total > 100) {
      const { name, formatted_address, rating } = item;
      const { lat, lng } = item.geometry.location;

      addAttractions(name, formatted_address, lat, lng, rating, addedCity.id);
    }
  });

  router.get("/", async (req, res) => {
    const cityName = req.params.id;
    const matchedCity = await getCity(cityName);
    // if the city doesn't exist in the DB return error
    if (matchedCity === null) {
      console.log(error);
    }
    // if city exist, then grab all the data( details, attraction) for the city
    const allData = {};
    const fetchedData = await Promise.all([
      getCity(cityName),
      getAttractions(cityName),
      addVisit(matchedCity.id, cityName),
    ]);
    allData.cityDetails = fetchedData[0];
    allData.attractions = fetchedData;
  });
  return allData;
};
