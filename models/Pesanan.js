const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const pesananSchema = new mongoose.Schema({
    invoice: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    cartId: [
        {
            type: ObjectId,
            ref: "Cart",
        },
    ],

});

module.exports = mongoose.model("Pesanan", pesananSchema);
