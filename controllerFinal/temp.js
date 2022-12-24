const City = require("../modelFinal/City");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const { getTempData, pollutionApi } = require("../apiFinal/weather");
const { weatherApiUpdateList, calculateAqi } = require("../utils/weather");

/** either create or update city temp to DB */
const createUpdateCityTemp = asyncWrapper(async (req, res, next) => {
  const { city, lon, lat } = req.body;
  console.log(city);
  if (!city) {
    return next(createCustomError("please send city name in req body", 404));
  }

  /******************************************************************/
  // general weather info
  const weatherList = await getTempData(city);

  // pollution info
  const aqi = await pollutionApi(lat, lon);
  console.log(aqi);

  /******************************************************************/

  // update list for schema
  const updatedList = weatherApiUpdateList(weatherList);
  // console.log(updatedList);

  // interpret pollution aqi
  const aqiIndex = calculateAqi(aqi);
  // { en: 'Fair', kr: '좋음' }

  return res.status(200).json({ res: true, data: "" });
});

module.exports = createUpdateCityTemp;
