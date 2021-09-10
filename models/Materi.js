const mongoose = require("mongoose");

const materiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Toko", tokoSchema);
