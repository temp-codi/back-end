const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const packageJson = require("./package.json");
require("dotenv").config();

// Basic SetUp
/*******************************************************/
// logger
const morgan = require("morgan");
app.use(morgan("tiny"));
// allow body req
app.use(express.json());

// Routes
/*******************************************************/
const city = require("./routes/city");
const temp = require("./routes/temp");
const openai = require("./routes/openai");
app.use(`/api/${packageJson.version}/city`, city);
app.use(`/api/${packageJson.version}/temp`, temp);
app.use(`/api/${packageJson.version}/openai`, openai);

// error middleware
/*******************************************************/
const NotFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(NotFound);
app.use(errorHandlerMiddleware);

// Testing
/*******************************************************/
// 노션 테이블 생성하기
const { getTableDB } = require("./api/notion");

const useOpenGPT = require("./api/openAi");
// useOpenGPT("stormy");

// starter
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
