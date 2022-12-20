const axios = require("axios");

const getTempData = async (city_name) => {
  const result = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${process.env.WEATHER_API}&units=metric`
  );
  return result;
};

module.exports = { getTempData };
