const express = require("express");
const app = express();
const packageJson = require("./package.json");
const temp = require("./routes/temp");
require("dotenv").config();

// middleware
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.json());

app.use(`/api/${packageJson.version}/temp`, temp);

app.listen(packageJson.port, () => {
  console.log("listening on port", packageJson.port);
});
