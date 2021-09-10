const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true
    },
    itemId: {
        type: ObjectId,
        ref: "Item",
    },

});

module.exports = mongoose.model("Cart", cartSchema);
