const express = require("express");
const router = express.Router();
const { reverseGeoLocation } = require("../controller/city");

// query = lon, lat
router.get("/", reverseGeoLocation);

module.exports = router;
