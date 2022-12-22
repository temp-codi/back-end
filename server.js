const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const packageJson = require("./package.json");
const router = require("./routes/temp");
const routerScrape = require("./routes/scrape");
require("dotenv").config();

// middleware
const morgan = require("morgan");
const { insertCityDB } = require("./middleware/cities");

app.use(morgan("tiny"));
app.use(express.json());

// routes
app.use(`/api/${packageJson.version}/temp`, insertCityDB, router);

app.use(`/api/${packageJson.version}/test`, routerScrape);

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
