const mongoose = require("mongoose");

const courseDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    require: true,
  },
  author: {
    type: String,
    minLength: 2,
    maxLength: 55,
    require: true,
  },
  tags: {
    type: Array,
  },
  price: {
    type: Number,
    require: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  isPublished: {
    type: Boolean,
  },
});

module.exports = mongoose.model("course", courseDocumentSchema);
