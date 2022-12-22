const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

module.exports = notion;
