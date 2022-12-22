const notion = require("../models/Notion");

const getNotionDB = async (req, res, next) => {
  const dbId = "65b6d5dd9e444811aa8bdd442c43eefe";
  const response = await notion.databases.retrieve({ database_id: dbId });
  console.log(response);
  next();
};

module.exports = { getNotionDB };
