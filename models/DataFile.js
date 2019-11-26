const mongoose = require("mongoose");

const DataFileSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  file: {
    type: Buffer,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("datafile", DataFileSchema);
