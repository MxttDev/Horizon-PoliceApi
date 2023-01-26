const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  playtime: {
    type: Number,
    required: true,
  },
});

const Data = mongoose.model("Data", dataSchema, "data");

module.exports = Data;
