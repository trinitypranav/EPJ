const mongoose = require("mongoose");
const mongodbUrl = process.env.mongodbUrl;

mongoose
  .connect(mongodbUrl)
  .then((result) => {
    console.log("connected successfully to MongoDB...");
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB ", error);
  });
