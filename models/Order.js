const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
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
    type: Array,
  },
});

module.exports = mongoose.model("Order", orderSchema);
