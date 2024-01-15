const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

// decoded = {_id:"", iat:""} i at means the time at which the token is generated. To find the age of token
userDocumentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.jwtKey); // Never push this to github. Always store in env file
  return token;
};

module.exports = mongoose.model("user", userDocumentSchema);
