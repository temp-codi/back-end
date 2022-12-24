const { CustomApiError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  // return res.status(500).json({ msg: err });
  console.log(err);
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ res: false, msg: err.message });
  }
  return res
    .status(500)
    .json({ res: false, msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
