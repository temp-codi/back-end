const axios = require("axios");

const getTempData = async (lat, lon) => {
  const result = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}&units=metric`
  );
  return result;
};

module.exports = { getTempData };
