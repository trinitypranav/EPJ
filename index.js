const express = require("express"); // returns a function to create a backend/ web app
const app = express();

// startup
require("./startup/logging")(); // set up the logger
require("./startup/routes")(app); // load all dependencies for the project
require("./startup/config")(app); // check if we have all configs in place e.g. mongoUrl, jwtKey, etc
require("./startup/mongodb")(); // connect to mongodb
require("./startup/validations")(); // Joi objectId() validations for reference and embedding

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Express-demo is listening on port ${port}`)
);

module.exports = server;
