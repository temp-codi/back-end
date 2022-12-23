const { getGoogleSearchImgs } = require("../api/googleSearch");

const getClothes = async (req, res) => {
  const { category, pageNo, gender } = req.body;
  console.log(category, pageNo, gender);
  const arr = await getGoogleSearchImgs({ category, pageNo, gender });
  return res.status(200).json({ res: true, data: arr });
};

module.exports = { getClothes };
