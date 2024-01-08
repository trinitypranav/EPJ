const express = require("express"); // returns a function to create a backend/ web app
const courses = require("./routes/courses");
const home = require("./routes/home");
const genres = require("./routes/genres");
const logger = require("./middlewares/logger");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(express.json()); // middleware for parsing request body JSON into JS object and adding it into req.body
app.use(express.urlencoded({ extended: true })); // parsing urlencoded data in the request body. Sent by client in case of form submit
app.use(express.static("public")); // serve static files from public folder
app.use(logger); // custom middleware logger
app.use(helmet()); // third-party middleware for securing Express apps by adding HTTP response headers
app.use(morgan("tiny")); // HTTP request logger middleware for node.js i.e. GET /api/courses 200 106 - 1.043 ms

// Routers
app.use("/api/courses", courses);
app.use("/", home);
app.use("/api/genres", genres);

console.log(app.get("env")); // if not defined, it returns 'development' by default

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express-demo is listening on port ${port}`)
);
