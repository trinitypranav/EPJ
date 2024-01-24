const logger = require("../middlewares/logger");
const courses = require("../routes/courses");
const home = require("../routes/home");
const genres = require("../routes/genres");
const users = require("../routes/users");
const eatvilla = require("../routes/eatvilla");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const error = require("../middlewares/error");

module.exports = function (app) {
  require("dotenv").config({ path: `.env.${app.get("env")}` }); // loads env vars from .env into process.env object. console.log("what is this dotenv", dotenv);//{ parsed: { mongodb_url: 'mongodb://something' } }
  app.use(express.json()); // middleware for parsing request body JSON into JS object and adding it into req.body
  app.use(express.urlencoded({ extended: true })); // parsing urlencoded data in the request body. Sent by client in case of form submit
  app.use(express.static("public")); // serve static files from public folder
  app.use(logger); // custom middleware logger
  app.use(helmet()); // third-party middleware for securing Express apps by adding HTTP response headers
  app.use(morgan("tiny")); // HTTP request logger middleware for node.js i.e. GET /api/courses 200 106 - 1.043 ms
  app.use(cors());
  // Routers
  app.use("/api/courses", courses);
  app.use("/", home);
  app.use("/api/genres", genres);
  app.use("/api/users", users);
  app.use("/api/eatvilla", eatvilla);
  // efficient error handling - error middleware
  app.use(error); // passing error handling middleware which sits at the end of request processing queue
};
