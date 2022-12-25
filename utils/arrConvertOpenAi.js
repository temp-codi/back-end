const createArray = (text) => {
  const input = text;

  const output = input
    .split("\n")
    .map((item) => item.replace(/[^a-zA-Z ]/g, "").trim());

  const result = output.filter((item) => item.trim() !== "");

  return result;
};
module.exports = createArray;
