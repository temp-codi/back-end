const { reverseGeoApi } = require("../api/bigData");
const Cities = require("../models/Cities");

const insertCityDB = async (req, res, next) => {
  // reverse geocoding
  const { lon, lat } = req.query;
  if (!lon || !lat) {
    req.errorCode = "please enter lon and lat in Get query";
    next();
    return;
  }
  const { data: geoData } = await reverseGeoApi(lat, lon);
  // cityname = data.city
  if (!geoData.city) {
    req.errorCode = "cannot retrieve city name";
    next();
    return;
  }

  // db 조회
  const cities = await Cities.find({});
  // if there are no cities
  if (cities.length === 0) {
    const city = await Cities.create({
      city_name: geoData.city,
      is_called_today: false,
    });
    req.dbSuccessData = city;
    next();
    return;
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
      req.dbSuccessData = dbCity;
      next();
      return;
    } else {
      const city = await Cities.findOneAndUpdate(
        { city_name: geoData.city },
        { is_called_today: true },
        { new: true }
      );
      req.dbSuccessData = city;
      next();
      return;
    }
  } else {
    const city = await Cities.create({
      city_name: geoData.city,
      is_called_today: false,
    });
    req.dbSuccessData = city;
    next();
    return;
  }
};

module.exports = { insertCityDB };
