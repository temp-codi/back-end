const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

const getNotionDB = async () => {
  const dbId = "65b6d5dd9e444811aa8bdd442c43eefe";
  const response = await notion.databases.retrieve({ database_id: dbId });
  console.log(response);
};

module.exports = { getNotionDB };
