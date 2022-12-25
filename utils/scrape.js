const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://openweathermap.org/weather-conditions";

const getScrapeData = async () => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // let hashMap = {};
  let arr = [];

  for (let i = 1; i < 8; i++) {
    const contaner = $(`table:eq(${i}) tr`);
    contaner.each(function (i) {
      const id = $(this).find("td:nth-child(1)").text().trim();
      const main = $(this).find("td:nth-child(2)").text().trim();
      const desc = $(this).find("td:nth-child(3)").text().trim();
      if (id !== "") {
        const obj = { id, main, desc };
        arr.push(obj);
      }
    });
    // hashMap[i] = arr;
  }
  return arr;
};

module.exports = { getScrapeData };
