const winston = require("winston");
require("winston-mongodb");
require("express-async-errors"); // monkey patch (dynamically updates async await code at run-time) a request handlers like adding try catch block. No need to write try catch block explicitly

module.exports = function () {
  // works only for syncronous code and outside express context
  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1); // 0-success, anything other-failure
  // });

  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // for async code and outside express context
  process.on("unhandledRejection", (ex) => {
    throw ex; // winston will automatically catch this exception
  });

  //winston setup for logging errors in console, file and mongodb
  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, { db: process.env.mongodbUrl, level:'info' });
};
