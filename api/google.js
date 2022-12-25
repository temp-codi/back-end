const axios = require("axios");

/** 구글 이미지 검색 api */
const getGoogleSearchImgs = async ({ category, pageNo, gender }) => {
  const response = await axios.get(`
 https://www.googleapis.com/customsearch/v1?key=${
   process.env.GOOGLE_API_KEY
 }&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${
    category + "for" + gender
  }&searchType=image&num=10&start=${pageNo}
 `);
  const arr = response.data.items.map((item) => {
    const {
      link,
      image: { contextLink },
    } = item;
    return { img: link, siteLink: contextLink };
  });
  return arr;
};

module.exports = getGoogleSearchImgs;
