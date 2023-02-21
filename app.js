require("dotenv").config();
require("express-async-errors");
const morgan = require("morgan");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// Swagger
// const swaggerUI = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDoument = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();
app.use(morgan("tiny"));

// connect DB
const connectDB = require("./db/connect");

// Routes
const city = require("./routes/city");
const temp = require("./routes/temp");
const openai = require("./routes/openai");
const google = require("./routes/google");

// error handlers
const NotFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1); // express-rate-limit: If you are behind a proxy/load balancer (usually the case with most hosting services, e.g. Heroku, Bluemix, AWS ELB, Nginx, Cloudflare, Akamai, Fastly, Firebase Hosting, Rackspace LB, Riverbed Stingray, etc.)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
/*******************************************************/
app.use(`/api/v1/city`, city);
app.use(`/api/v1/temp`, temp);
app.use(`/api/v1/openai`, openai);
app.use(`/api/v1/google`, google);
app.use(NotFound);
app.use(errorHandlerMiddleware);

// Testing
/*******************************************************/
// 노션 테이블 생성하기
const { getTableDB, createNotionDB } = require("./api/notion");
getTableDB();

const useOpenGPT = require("./api/openAi");

const port = process.env.PORT || 3000;

// starter
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
