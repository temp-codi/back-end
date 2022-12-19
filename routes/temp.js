const express = require("express");
const router = express.Router();
const { getTempData } = require("../api/openWeatherApi");

router.get("/", async (req, res) => {
  try {
    const { data } = await getTempData();
    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(500)
      .json({ result: false, msg: "Something wrong with weather API" });
  }
});

module.exports = router;
