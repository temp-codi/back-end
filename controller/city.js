const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const { reverseGeoApi } = require("../api/reverse-geo");

const reverseGeoLocation = asyncWrapper(async (req, res, next) => {
  const { lon, lat } = req.query;
  if (!lon || !lat) {
    return next(createCustomError("please enter location correctly", 404));
  }
  const { data: city } = await reverseGeoApi(lat, lon);
  return res.status(200).json({ res: true, data: city });
});

module.exports = { reverseGeoLocation };
