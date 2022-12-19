const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const packageJson = require("./package.json");
const temp = require("./routes/temp");
require("dotenv").config();

// middleware
const morgan = require("morgan");
const { insertCityDB } = require("./middleware/cities");

app.use(morgan("tiny"));
app.use(express.json());

app.use(`/api/${packageJson.version}/temp`, insertCityDB, temp);

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
