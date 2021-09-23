const Item = require("../models/Item");
const Toko = require("../models/Toko");
const Category = require("../models/Category");
const Order = require("../models/Order");
const Tax = require("../models/Pajak");

module.exports = {
  home: async (req, res) => {
    try {
      const toko = await Toko.find();
      const tax = await Tax.find();
      const allItem = await Item.find().populate({
        path: "categoryId",
        select: "name",
      });
      const listCategory = await Category.find().select("_id name");
      const order = await Order.find();

      res.status(200).json({
        toko,
        allItem,
        listCategory,
        order,
        tax,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  cart: async (req, res) => {
    const { item } = req.body;
    console.log(item);

    if (item === undefined) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }

    const invoice = Math.floor(1000 + Math.random() * 9000);
    const today = new Date();
    const tanggal =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const newBooking = {
      invoice,
      tanggal,
      item,
    };

    const booking = await Order.create(newBooking);

    res.status(201).json({ message: "Success Booking", booking });
  },
};
