const axios = require("axios");
const notion = require("../db/notion");
const { getScrapeData } = require("../api/scrape");
const { notionParam } = require("../utils/notionParam");

const getNotionDB = async () => {
  const dbId = process.env.NOTION_DB_ID;
  const response = await notion.databases.retrieve({ database_id: dbId });
  console.log(response);
};

const testNotionDB = async () => {
  const dbId = process.env.NOTION_DB_ID;
  // post request
  // req.body
  const scrapeData = await getScrapeData();
  console.log(scrapeData);

  for (let i = 0; i < scrapeData.length; i++) {
    const { id, main, desc } = scrapeData[i];
    const response = await notion.pages.create(
      notionParam({ dbId, id, main, desc })
    );
  }
};

module.exports = { getNotionDB, testNotionDB };
