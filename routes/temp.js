const express = require("express");
const router = express.Router();
const { getTempData } = require("../api/openWeatherApi");
const { reverseGeoApi } = require("../api/bigData");
const Cities = require("../models/Cities");

router.get("/", async (req, res) => {
  const { errorCode, dbSuccessData } = req;
  if (errorCode) {
    return res.status(500).json({ msg: errorCode });
  }
  return res.status(200).json({ res: true, data: dbSuccessData });
});

module.exports = router;
