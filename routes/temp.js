const express = require("express");
const router = express.Router();
const {
  createUpdateCityTemp,
  getWeatherCode,
} = require("../controller/temp/index");

router.post("/", createUpdateCityTemp);

router.post("/getCode", getWeatherCode);

module.exports = router;
