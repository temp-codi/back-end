const express = require("express");
const router = express.Router();
const { getTempForCity } = require("../controller/temp");
const { getClothes } = require("../controller/google");

router.get("/", getTempForCity);

router.post("/getClothes", getClothes);

module.exports = router;
