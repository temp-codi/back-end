const City = require("../../model/City");
const asyncWrapper = require("../../middleware/async");
const { createCustomError } = require("../../errors/custom-error");
const { getTempData, pollutionApi } = require("../../api/weather");
const {
  weatherApiUpdateList,
  calculateAqi,
  validateApiToday,
} = require("../../utils/weather");

/** either create or update city temp to DB */
const createUpdateCityTemp = asyncWrapper(async (req, res, next) => {
  const { city, lon, lat } = req.body;
  if (!city) {
    return next(createCustomError("please send city name in req body", 404));
  }
  // find if city exist in the db
  /******************************************************************/
  const ExistCity = await City.findOne({ city_name: city });
  // if exist, check if the api was already called today
  /******************************************************************/
  if (ExistCity) {
    const isCalledToday = validateApiToday(ExistCity.api_called_date);

    if (isCalledToday) {
      return res.status(200).json({ res: true, data: ExistCity });
    } else {
      // general weather info
      const weatherList = await getTempData(city);

      // pollution info
      const aqi = await pollutionApi(lat, lon);

      // update list for schema
      const updatedList = weatherApiUpdateList(weatherList);

      // interpret pollution aqi
      const aqiIndex = calculateAqi(aqi);

      const UpdateCity = City.findOneAndUpdate(
        { city_name: city },
        {
          city_name: city,
          api_called_date: new Date(),
          list: updatedList,
          pollution_en: aqiIndex.en,
          pollution_kr: aqiIndex.kr,
        },
        { new: true, runValidators: true }
      );

      return res.status(200).json({ res: true, data: UpdateCity });
    }
  } else {
    // general weather info
    const weatherList = await getTempData(city);

    // pollution info
    const aqi = await pollutionApi(lat, lon);

    // update list for schema
    const updatedList = weatherApiUpdateList(weatherList);

    // interpret pollution aqi
    const aqiIndex = calculateAqi(aqi);

    // insert into mongoDB
    const response = await City.create({
      city_name: city, // req.body data
      api_called_date: new Date(),
      list: updatedList,
      pollution_en: aqiIndex.en,
      pollution_kr: aqiIndex.kr,
    });

    return res.status(200).json({ res: true, data: response });
  }
});

module.exports = createUpdateCityTemp;
