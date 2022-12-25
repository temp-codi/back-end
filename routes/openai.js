const express = require("express");
const router = express.Router();
const { getClothes } = require("../controller/openai/index");

router.post("/", getClothes);

module.exports = router;
