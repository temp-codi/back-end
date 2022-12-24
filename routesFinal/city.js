const express = require("express");
const router = express.Router();
const { reverseGeoLocation } = require("../controllerFinal/city");

// query = lon, lat
router.get("/", reverseGeoLocation);

module.exports = router;
