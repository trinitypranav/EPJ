const mongoose = require("mongoose");

// we can also use enum if we have a set of values
const userDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 55,
    require: true,
  },
  email: {
    type: String,
    minLength: 2,
    maxLength: 55,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 2,
    maxLength: 1024,
    require: true,
  },
});

module.exports = mongoose.model("user", userDocumentSchema);
