const fs = require("fs-extra");
const path = require("path");
const Category = require("../models/Category");
const Item = require("../models/Item");
const Toko = require("../models/Toko");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const Order = require("../models/Order");
const Pajak = require("../models/Pajak");
const Diskon = require("../models/Diskon");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          alert,
          title: "My Menu | Login",
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", "User yang anda masukan tidak ada!!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password yang anda masukan tidak cocok!!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const status = await Users.findOne({ username: username });
      status.status = "Aktif";
      await status.save();

      req.session.user = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        status: user.status,
      };
      // const role = user.status
      // console.log(role);
      res.redirect("/admin/dashboard");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/signin");
    }
  },

  actionLogout: async (req, res) => {
    try {
      const { id } = req.body;
      const status = await Users.findOne({ _id: id });
      status.status = "Non Aktif";
      await status.save();
      req.session.destroy();
      res.redirect("/admin/signin");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  viewDashboard: async (req, res) => {
    try {
      // const member = await Member.find();
      // const booking = await Booking.find();
      // const item = await Item.find();
      res.render("admin/dashboard/view_dashboard", {
        title: "My Menu | Dashboard",
        users: req.session.user,
        // member,
        // booking,
        // item,
      });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },
  //  <---------- MODULE CATEGORY ---------->
  viewCategory: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      // res.json(category);
      res.render("admin/category/view_category", {
        category,
        alert,
        title: "My Menu | Category",
        users: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      // console.log(name);
      await Category.create({ name });
      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      await category.remove();
      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  //  <---------- MODULE CATEGORY ---------->

  //  <---------- MODULE Diskon ---------->
  viewDiskon: async (req, res) => {
    try {
      const diskon = await Diskon.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      // res.json(category);
      res.render("admin/diskon/view_diskon", {
        diskon,
        alert,
        title: "My Menu | Diskon",
        users: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/diskon");
    }
  },
  addDiskon: async (req, res) => {
    try {
      const { nameDiskon, amount } = req.body;
      await Diskon.create({ nameDiskon, amount });
      req.flash("alertMessage", "Success Add Diskon");
      req.flash("alertStatus", "success");
      res.redirect("/admin/diskon");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/diskon");
    }
  },
  editDiskon: async (req, res) => {
    try {
      const { id, nameDiskon, amount } = req.body;
      const diskon = await Diskon.findOne({ _id: id });
      diskon.nameDiskon = nameDiskon;
      diskon.amount = amount;
      await diskon.save();
      req.flash("alertMessage", "Success Update Diskon");
      req.flash("alertStatus", "success");
      res.redirect("/admin/diskon");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/diskon");
    }
  },
  deleteDiskon: async (req, res) => {
    try {
      const { id } = req.params;
      const diskon = await Diskon.findOne({ _id: id });
      await diskon.remove();
      req.flash("alertMessage", "Success Delete Diskon");
      req.flash("alertStatus", "success");
      res.redirect("/admin/diskon");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/diskon");
    }
  },
  //  <---------- MODULE Diskon ---------->

  //  <---------- MODULE ITEM ---------->
  viewItem: async (req, res) => {
    try {
      const item = await Item.find()
        .populate({
          path: "categoryId",
          select: "id name",
        })
        .populate({
          path: "diskonId",
          select: "id nameDiskon amount",
        });
      const diskon = await Diskon.find();
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/item/view_item", {
        item,
        alert,
        category,
        diskon,
        title: "My Menu | Item",
        users: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/item");
    }
  },

  addItem: async (req, res) => {
    try {
      const { diskonId, categoryId, nameItem, harga, desc } = req.body;
      const category = await Category.findOne({ _id: categoryId });
      const newItem = {
        categoryId,
        diskonId,
        nameItem,
        harga,
        desc,
        imageUrl: `images/${req.file.filename}`,
      };
      const item = await Item.create(newItem);
      category.itemId.push({ _id: item._id });
      await category.save();
      await item.save();
      req.flash("alertMessage", "Success Add Item");
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  editItem: async (req, res) => {
    try {
      const { id, categoryId, nameItem, harga, desc, diskonId } = req.body;
      const item = await Item.findOne({ _id: id })
        .populate({
          path: "categoryId",
          select: "id name",
        })
        .populate({
          path: "diskonId",
          select: "id nameDiskon amount",
        });
      if (req.file == undefined) {
        item.nameItem = nameItem;
        item.harga = harga;
        item.categoryId = categoryId;
        item.diskonId = diskonId;
        await item.save();
        req.flash("alertMessage", "Success Update Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      } else {
        await fs.unlink(path.join(`public/${item.imageUrl}`));
        item.nameItem = nameItem;
        item.harga = harga;
        item.imageUrl = `images/${req.file.filename}`;
        await item.save();
        req.flash("alertMessage", "Success Update Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id });
      await fs.unlink(path.join(`public/${item.imageUrl}`));
      await item.remove();
      req.flash("alertMessage", "Success Delete Item");
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  //  <---------- MODULE ITEM ---------->

  //  <---------- MODULE TOKO ---------->
  viewToko: async (req, res) => {
    try {
      const toko = await Toko.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      console.log(toko);
      res.render("admin/toko/view_toko", {
        title: "My Menu | Toko",
        alert,
        toko,
        users: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/toko");
    }
  },
  editToko: async (req, res) => {
    try {
      const { id, nameToko, harga } = req.body;
      const toko = await Toko.findOne({ _id: id });
      toko.nameToko = nameToko;
      toko.harga = harga;
      await toko.save();
      req.flash("alertMessage", "Success Update Nama Toko");
      req.flash("alertStatus", "success");
      res.redirect("/admin/toko");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/toko");
    }
  },
  //  <---------- MODULE TOKO ---------->

  //  <---------- MODULE USER ---------->
  viewUser: async (req, res) => {
    try {
      const user = await Users.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      console.log(user);
      res.render("admin/user/view_user", {
        title: "My Menu | Toko",
        alert,
        user,
        users: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },
  addUser: async (req, res) => {
    try {
      const { name, role, username, password } = req.body;
      await Users.create({ name, role, username, password });
      req.flash("alertMessage", "Success Add User");
      req.flash("alertStatus", "success");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id });
      await user.remove();
      req.flash("alertMessage", "Success Delete User");
      req.flash("alertStatus", "success");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },
  //  <---------- MODULE USER ---------->

  //  <---------- MODULE ITEM ---------->
  viewStok: async (req, res) => {
    try {
      const item = await Item.find().populate({
        path: "categoryId",
        select: "id name",
      });
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/stok/view_stok", {
        item,
        alert,
        category,
        title: "My Menu | Item",
        users: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/stok");
    }
  },
  setStokAda: async (req, res) => {
    try {
      const { id } = req.params;
      const setStok = await Item.findOne({ _id: id });
      setStok.stok = "Ada";
      await setStok.save();
      req.flash("alertMessage", "Success Set Stok");
      req.flash("alertStatus", "success");
      res.redirect("/admin/stok");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/stok");
    }
  },
  setStokKosong: async (req, res) => {
    try {
      const { id } = req.params;
      const setStok = await Item.findOne({ _id: id });
      setStok.stok = "Kosong";
      await setStok.save();
      req.flash("alertMessage", "Success Set Stok");
      req.flash("alertStatus", "success");
      res.redirect("/admin/stok");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/stok");
    }
  },
  //  <---------- MODULE ITEM ---------->

  viewOrder: async (req, res) => {
    try {
      const order = await Order.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/histori/view_histori", {
        order,
        alert,
        title: "My Menu | Hisotry",
        users: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/histori");
    }
  },

  //  <---------- MODULE PAJAK ---------->
  viewPajak: async (req, res) => {
    try {
      const pajak = await Pajak.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      console.log("tax :", pajak);
      res.render("admin/pajak/view_pajak", {
        title: "My Menu | Pajak",
        alert,
        pajak,
        users: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pajak");
    }
  },
  editPajak: async (req, res) => {
    try {
      const { id, tax } = req.body;
      const pajak = await Pajak.findOne({ _id: id });
      pajak.tax = tax;
      await pajak.save();
      req.flash("alertMessage", "Success Update Pajak");
      req.flash("alertStatus", "success");
      res.redirect("/admin/pajak");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pajak");
    }
  },
  //  <---------- MODULE PAJAK ---------->
};
