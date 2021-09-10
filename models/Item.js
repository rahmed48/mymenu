const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  nameItem: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  stok: {
    type: String,
    default: "Ada",
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Item", itemSchema);
