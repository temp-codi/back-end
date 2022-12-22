const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const packageJson = require("./package.json");
const router = require("./routes/temp");
require("dotenv").config();

// middleware
const morgan = require("morgan");
const { insertCityDB } = require("./middleware/cities");
const { getNotionDB } = require("./middleware/notion");

app.use(morgan("tiny"));
app.use(express.json());

app.use(`/api/${packageJson.version}/temp`, insertCityDB, router);

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

(async () => {
  const databaseId = "65b6d5dd9e444811aa8bdd442c43eefe";
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
})();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");
    app.listen(packageJson.port, () => {
      console.log("listening on port " + packageJson.port);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
