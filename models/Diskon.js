const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const diskonSchema = new mongoose.Schema({
  nameDiskon: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Diskon", diskonSchema);
