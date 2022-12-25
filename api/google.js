const axios = require("axios");

const getGoogleSearchImgs = async ({ category, pageNo, gender }) => {
  const response = await axios.get(`
 https://www.googleapis.com/customsearch/v1?key=${
   process.env.GOOGLE_API_KEY
 }&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${
    category + "for" + gender
  }&searchType=image&num=10&start=${pageNo}
 `);
  const arr = response.data.items.map((item) => {
    return item.link;
  });
  return arr;
};

module.exports = { getGoogleSearchImgs };
