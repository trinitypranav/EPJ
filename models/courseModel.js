const mongoose = require("mongoose");

const courseDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("course", courseDocumentSchema);
