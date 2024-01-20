const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  console.log(process.env);
  mongoose.connect(process.env.mongodbUrl).then((result) => {
    winston.info(
      `Connected Successfully To MongoDB - ${process.env.mongodbUrl}`
    );
  });
};
