const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const packageJson = require("./package.json");
require("dotenv").config();

// logger
const morgan = require("morgan");
app.use(morgan("tiny"));
// allow body req
app.use(express.json());

// routes
const city = require("./routesFinal/city");
const temp = require("./routesFinal/temp");
app.use(`/api/${packageJson.version}/city`, city);
app.use(`/api/${packageJson.version}/temp`, temp);

// error middleware
const NotFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(NotFound);
app.use(errorHandlerMiddleware);

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
