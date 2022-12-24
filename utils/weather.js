/** converts to appropriate schema for mongoDB */
const weatherApiUpdateList = (list) => {
  return list.map((item) => {
    const {
      dt,
      main: { temp, feels_like, humidity },
      weather: [{ id }],
      clouds: { all },
      wind: { speed },
    } = item;
    return {
      dt,
      temp,
      feels_like,
      humidity,
      cloud_in_percentage: all,
      wind_speed: speed,
      weather_id: id,
    };
  });
};

/** converts pollution aqi to words */
const calculateAqi = (aqi) => {
  switch (aqi) {
    case 1:
      return { en: "Good", kr: "좋음" };
    case 2:
      return { en: "Fair", kr: "좋음" };
    case 3:
      return { en: "Moderate", kr: "중간" };
    case 4:
      return { en: "Poor", kr: "나쁨" };
    case 5:
      return { en: "Very Poor", kr: "매우 나쁨" };
    default:
      return { en: "InValid", kr: "데이터 문제있음" };
  }
};

/** determine if a given date falls within the current day using unix timestamp */

const validateApiToday = (api_called_date) => {
  // Parse the date string into a Date object
  const date = new Date(api_called_date);

  // Get the Unix timestamp for the given date
  const timestamp = Math.floor(date.getTime() / 1000);

  // Get the current date
  const now = new Date();

  // Get the Unix timestamp for the current date
  const nowTimestamp = Math.floor(now.getTime() / 1000);

  // Check if the timestamp for the given date falls within the same day as the current date
  if (Math.floor(timestamp / 86400) === Math.floor(nowTimestamp / 86400)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { weatherApiUpdateList, calculateAqi, validateApiToday };
