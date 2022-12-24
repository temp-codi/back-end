const notFound = (req, res) =>
  res.status(404).json({ res: false, msg: "Route does not exist" });

module.exports = notFound;
