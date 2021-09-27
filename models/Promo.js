const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const promoSchema = new mongoose.Schema({
  namePromo: {
    type: String,
    required: true,
  },
  itemId: [
    {
      unique: true,
      type: ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Promo", promoSchema);
