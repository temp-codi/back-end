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

  /******************************************************************/
  // update list for schema
  const updatedList = weatherApiUpdateList(weatherList);

  // interpret pollution aqi
  const aqiIndex = calculateAqi(aqi);

  /******************************************************************/
  // insert into mongoDB
  const response = await City.create({
    city_name: city, // req.body data
    list: updatedList,
    pollution_en: aqiIndex.en,
    pollution_kr: aqiIndex.kr,
    is_called_today: true,
  });
  console.log(response);

  return res.status(200).json({ res: true, data: updatedList });
});

module.exports = createUpdateCityTemp;
