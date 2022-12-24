const codeArr = require("../../utils/weatherCodes");
const asyncWrapper = require("../../middleware/async");
const { createCustomError } = require("../../errors/custom-error");

const getWeatherCode = asyncWrapper(async (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return next(createCustomError("please send weather code in req body", 404));
  }

  const weatherData = codeArr.filter((item) => {
    return Number(item.id) === Number(code);
  });

  if (weatherData.length === 0) {
    return next(createCustomError("wrong weather code", 404));
  }

  return res.status(200).json({ res: true, data: weatherData[0] });
});

module.exports = getWeatherCode;
