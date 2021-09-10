const mongoose = require("mongoose");

const tokoSchema = new mongoose.Schema({
  nameToko: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Toko", tokoSchema);
