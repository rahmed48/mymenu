const Item = require("../models/Item");
const Toko = require("../models/Toko");
const Category = require("../models/Category");
const Order = require("../models/Order");
const Pesanan = require("../models/Pesanan");
const Cart = require("../models/Cart");

module.exports = {
  home: async (req, res) => {
    try {
      const toko = await Toko.find();
      const item = await Item.find();
      const listCategory = await Category.find().select("_id name");
      const category = await Category.find().populate({
        path: "itemId",
      });

      res.status(200).json({
        toko,
        item,
        category,
        listCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  toko: async (req, res) => {
    try {
      const toko = await Toko.find();

      res.status(200).json({
        toko,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  item: async (req, res) => {
    try {
      const item = await Item.find().populate({
        path: "categoryId",
        select: "name",
      });

      res.status(200).json({
        item,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // detailItem: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const item = await Item.findOne({ _id: id });
  //     res.status(200).json({
  //       item,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  // selectCategory: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const item = await Item.find({ categoryId: id });
  //     res.status(200).json({
  //       item,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  // pesan: async (req, res) => {
  //   try {
  //     const pesanan = await Pesanan.find();
  //     res.status(200).json({
  //       pesanan
  //     })
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },

  // pesanan: async (req, res) => {
  //   try {
  //     // const cart = await Cart.find();
  //     const pesanan = await Pesanan.find().populate({
  //       path: "cartId",
  //       select: "id qty itemId",
  //       populate: {
  //         path: "itemId",
  //         select: "id harga nameItem",
  //       },
  //     });
  //     res.status(200).json({
  //       pesanan,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },

  cart: async (req, res) => {
    // const { item, tanggal, invoice } = req.body;
    const invoice = Math.floor(1000000 + Math.random() * 9000000);
    // const today = new Date();
    // const tanggal =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();

    const newOrder = {
      invoice,
      // tanggal,
      // item,
    };

    const order = await Order.create(newOrder);

    res.status(201).json({ message: "Success Order", order });
  },
};
