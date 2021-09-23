const mongoose = require("mongoose");

const pajakSchema = new mongoose.Schema({
  tax: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pajak", pajakSchema);
