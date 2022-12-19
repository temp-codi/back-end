const axios = require("axios");

const reverseGeoApi = async (lat, lon) => {
  return await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
  );
};

module.exports = { reverseGeoApi };
