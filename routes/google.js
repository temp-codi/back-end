const express = require("express");
const router = express.Router();
const { getClothes } = require("../controller/google/index");

router.post("/img", getClothes);

module.exports = router;
