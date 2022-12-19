const axios = require("axios");
console.log(process.env.WEATHER_API);

const getTempData = async () => {
  const result = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=36.3298522&lon=127.4147562&appid=${process.env.WEATHER_API}&units=metric`
  );
  return result;
};

module.exports = { getTempData };
