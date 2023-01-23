const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const packageJson = require("./package.json");
require("dotenv").config();

// Basic SetUp
/*******************************************************/
// logger
const morgan = require("morgan");
app.use(morgan("tiny"));
// allow body req
app.use(express.json());
// cors
app.set("trust proxy", 1); // express-rate-limit: If you are behind a proxy/load balancer (usually the case with most hosting services, e.g. Heroku, Bluemix, AWS ELB, Nginx, Cloudflare, Akamai, Fastly, Firebase Hosting, Rackspace LB, Riverbed Stingray, etc.)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(cors());
app.use(xss());
app.use(helmet());

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoument = YAML.load("./swagger.yaml");

// Routes
/*******************************************************/
const city = require("./routes/city");
const temp = require("./routes/temp");
const openai = require("./routes/openai");
const google = require("./routes/google");
app.use(`/api/${packageJson.version}/city`, city);
app.use(`/api/${packageJson.version}/temp`, temp);
app.use(`/api/${packageJson.version}/openai`, openai);
app.use(`/api/${packageJson.version}/google`, google);

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

const port = process.env.PORT || 3000;

// starter
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");
    server.listen(port, () => {
      console.log("listening on port " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
