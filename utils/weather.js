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

module.exports = { weatherApiUpdateList, calculateAqi };
