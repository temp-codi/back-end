const axios = require("axios");
const notion = require("../db/notion");
const { getScrapeData } = require("../api/scrape");

const getNotionDB = async () => {
  const dbId = process.env.NOTION_DB_ID;
  const response = await notion.databases.retrieve({ database_id: dbId });
  console.log(response);
};

const testNotionDB = async () => {
  const dbId = process.env.NOTION_DB_ID;
  const response = await notion.databases.update({
    database_id: dbId,
    properties: {
      ID: {
        title: "sdf",
        number: {
          format: "number",
        },
        date: {},
        people: {},
        files: {},
        checkbox: {},
        url: {},
        email: {},
        phone_number: {},
        formula: {
          expression: "sdf",
        },
        relations: {},
        created_time: {},
        created_by: {},
        last_edited_time: {},
        last_edited_by: {},
        rollup: {
          rollup_property_name: "sdf",
          relation_property_name: "sdf",
          function: "count",
        },
      },
    },
  });
};

const updateNotionDB = async () => {
  const arr = await getScrapeData();
  console.log(arr);

  const id_rich_text = {
    type: "text",
    text: {
      content: "testcreate",
      link: null,
    },
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: "default",
    },
    plain_text: "testcreate",
    href: null,
  };
  const main_rich_text = {};
  const desc_rich_text = {};

  // notion api
  const options = {
    method: "PATCH",
    url: `https://api.notion.com/v1/databases/${process.env.NOTION_DB_ID}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
    },
    data: {
      properties: {
        ID: {
          title: [
            {
              type: "text",
              text: {
                content: "200",
                link: null,
              },
            },
          ],
        },
      },
    },
  };

  const res = await axios.request(options);
  console.log(res);
};

module.exports = { getNotionDB, testNotionDB };
