const axios = require("axios");

const getTempData = async (city_name) => {
  const {
    data: { list },
  } = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${process.env.WEATHER_API}&units=metric`
  );

  return list;
};

const pollutionApi = async (lat, lon) => {
  const {
    data: { list },
  } = await axios.get(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
  );
  const {
    main: { aqi },
  } = list[0];

  return aqi;
};

module.exports = { getTempData, pollutionApi };
