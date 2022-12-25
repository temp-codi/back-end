const asyncWrapper = require("../../middleware/async");
const { createCustomError } = require("../../errors/custom-error");
const useOpenGPT = require("../../api/openAi");
const createArray = require("../../utils/arrConvertOpenAi");

const getClothes = asyncWrapper(async (req, res, next) => {
  const { desc, no } = req.body;

  if (!desc || !no) {
    return next(
      createCustomError("please enter weather desc in req body", 404)
    );
  }

  const {
    data: {
      choices: [{ text }],
    },
  } = await useOpenGPT(desc, no);

  const newArr = createArray(text);

  // convert to array with no numbers, no spaces at the end, and no string that contains only a number

  return res.status(200).json({ res: true, data: newArr });
});

module.exports = getClothes;
