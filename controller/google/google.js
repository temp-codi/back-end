const asyncWrapper = require("../../middleware/async");
const getGoogleSearchImgs = require("../../api/google");

const getClothes = asyncWrapper(async (req, res, next) => {
  const { category, pageNo, gender } = req.body;

  if (!category || !pageNo || !gender) {
    return next(
      createCustomError("please enter weather desc in req body", 404)
    );
  }

  const arr = await getGoogleSearchImgs({ category, pageNo, gender });
  return res.status(200).json({ res: true, data: arr });
});

module.exports = getClothes;
