const notion = require("../db/notion");
const { getScrapeData } = require("../utils/scrape");
const { notionParam } = require("../utils/notionParam");
const { writeFileSync } = require("fs");

/** 일반 노션 데이터 조회 => 아무짝에도 쓸모없는 API */
const getNotionDB = async () => {
  const dbId = process.env.NOTION_DB_ID;
  const response = await notion.databases.retrieve({ database_id: dbId });
  console.log(response);
};
/** 노션에서 받아온 데이터를 로컬에 파일에 저장하기 */
const getTableDB = async () => {
  const dbId = process.env.NOTION_DB_ID;
  const payload = {
    path: `databases/${dbId}/query`,
    method: "POST",
  };
  const { results } = await notion.request(payload);
  console.log(results);

  const table = results.map((item) => {
    console.log(item);
    return {
      id: item.properties.id.title[0].plain_text,
      main: item.properties.main.rich_text[0].plain_text,
      desc: item.properties.desc.rich_text[0].plain_text,
      icon: item.properties.icon.rich_text[0].plain_text,
    };
  });

  // writeFileSync("./utils/weatherCodes.js", JSON.stringify(table));
};

/** 데이터 베이스에 넣는 API */
const createNotionDB = async () => {
  const dbId = process.env.NOTION_DB_ID;

  const scrapeData = await getScrapeData();
  console.log(scrapeData);

  for (let i = 0; i < scrapeData.length; i++) {
    const { id, main, desc, icon } = scrapeData[i];
    const response = await notion.pages.create(
      notionParam({ dbId, id, main, desc, icon })
    );
  }
};

module.exports = { getNotionDB, getTableDB, createNotionDB };
