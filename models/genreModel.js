const mongoose = require("mongoose");

// we can also use enum if we have a set of values
const genreDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    require: true,
  },
  movies: {
    type: Array,
  },
});

module.exports = mongoose.model("genre", genreDocumentSchema);
