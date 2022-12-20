const express = require("express");
const router = express.Router();
const { getTempData } = require("../api/openWeatherApi");
const City = require("../models/City");
const getMonth = require("../utils/getMonth");

router.get("/", async (req, res) => {
  const { errorCode, dbSuccessData } = req;
  if (errorCode !== undefined) {
    return res.status(400).json({ msg: errorCode });
  }

  // console.log("year", new Date(cityData.list[0].dt * 1000).getFullYear());
  // console.log("month", getMonth(new Date(cityData.list[0].dt * 1000)));
  // console.log("day", new Date(cityData.list[0].dt * 1000).getDate());
  console.log(dbSuccessData.city_name);
  // db 조회
  const city = await City.findOne({ city_name: dbSuccessData.city_name });
  // if there are no cities
  if (!city) {
    const { data: cityData } = await getTempData(dbSuccessData.city_name);
    if (cityData.cod !== "200") {
      return res.status(400).json({ msg: "something wrong with weather api" });
    }
    const updatedList = cityData.list.map((item) => {
      return {
        dt: item.dt,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        humidity: item.main.humidity,
        cloud: item.clouds.all,
        wind_speed: item.wind.speed,
        weather_id: item.weather[0].id,
        weather_main: item.weather[0].main,
        weather_desc: item.weather[0].description,
      };
    });
    const city = await City.create({
      city_name: dbSuccessData.city_name,
      list: updatedList,
    });
    return res.status(200).json({ res: true, data: city });
  } else {
    return res.status(200).json({ res: true, data: city });
  }
});

module.exports = router;
