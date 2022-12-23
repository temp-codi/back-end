const axios = require("axios");

const getGoogleSearchImgs = async (keywords) => {
  const response = await axios.get(`
 https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${keywords}&searchType=image
 `);
  const arr = response.data.items.map((item) => {
    return item.link;
  });
  console.log(arr);
};

module.exports = { getGoogleSearchImgs };
