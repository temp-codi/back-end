const notion = require("../db/notion");

const getNotionDB = async () => {
  const dbId = process.env.NOTION_DB_ID;
  const response = await notion.databases.retrieve({ database_id: dbId });
  console.log(response);
};

module.exports = { getNotionDB };
