const express = require("express");
const router = express.Router();
const {
  createUpdateCityTemp,
  getWeatherCode,
} = require("../controller/temp/index");

router.post("/", createUpdateCityTemp);

router.post("/getCode", getWeatherCode);

// mongoDB find

// if exist => check if called today

// if it is not called today => update MongoDB

// if it is called today => call weatherAPI + create mongoDB

// if not exist => create mongoDB

module.exports = router;
