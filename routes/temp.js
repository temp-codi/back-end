const express = require("express");
const router = express.Router();
const { getTempData } = require("../api/openWeatherApi");
const { reverseGeoApi } = require("../api/bigData");
const Cities = require("../models/Cities");

router.get("/", async (req, res) => {
  // reverse geocoding
  const { lon, lat } = req.query;
  if (!lon || !lat) {
    return res
      .status(500)
      .json({ error: "please enter lon and lat in Get query" });
  }
  const { data: geoData } = await reverseGeoApi(lat, lon);
  // cityname = data.city
  if (!geoData.city) {
    return res.status(500).json({ error: "cannot retrieve city name" });
  }

  // db 조회
  const cities = await Cities.find({});
  // if there are no cities
  if (cities.length === 0) {
    const city = await Cities.create({
      city_name: geoData.city,
      is_called_today: false,
    });
    return res.status(200).json({ res: true, data: city });
  }

  // if there are data in our data => check if req city exist
  let is_Exist = false;
  let dbCity = {};
  for (const city of cities) {
    if (city.city_name == geoData.city) {
      is_Exist = true;
      dbCity = city;
    }
  }

  if (is_Exist) {
    if (dbCity.is_called_today === true) {
      return res.status(200).json({ res: true, data: dbCity });
    } else {
      const city = await Cities.findOneAndUpdate(
        { city_name: geoData.city },
        { is_called_today: true },
        { new: true }
      );
      return res.status(200).json({ res: true, data: city });
    }
  } else {
    const city = await Cities.create({
      city_name: geoData.city,
      is_called_today: false,
    });
    return res.status(200).json({ res: true, data: city });
  }
});

module.exports = router;
