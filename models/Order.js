const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  invoice: {
    type: String,
    unique: true,
    required: true,
  },
  tanggal: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
