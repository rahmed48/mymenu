const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload } = require("../middlewares/multer");
const auth = require("../middlewares/auth");
// const roleAkses = require("../controllers/adminController");

router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.put("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);

// ENDPOINT CATEGORY
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

// // ENDPOINT TOKO
router.get("/toko", adminController.viewToko);
router.put("/toko", adminController.editToko);

// // ENDPOINT PAJAK
router.get("/pajak", adminController.viewPajak);
router.put("/pajak", adminController.editPajak);

// ENDPOINT ITEM
router.get("/item", adminController.viewItem);
router.post("/item", upload, adminController.addItem);
router.put("/item", upload, adminController.editItem);
router.delete("/item/:id", adminController.deleteItem);

// ENDPOINT USER
router.get("/user", adminController.viewUser);
router.post("/user", adminController.addUser);
router.delete("/user/:id", adminController.deleteUser);
// router.put("/user", adminController.editUser);

// ENDPOINT STOK
router.get("/stok", adminController.viewStok);
router.delete("/stok/ada/:id", adminController.setStokAda);
router.delete("/stok/kosong/:id", adminController.setStokKosong);

// ENDPOINT DISKON
router.get("/diskon", adminController.viewDiskon);
router.post("/diskon", upload, adminController.addDiskon);
router.put("/diskon", upload, adminController.editDiskon);
router.delete("/diskon/:id", adminController.deleteDiskon);

// ENDPOINT PROMO
router.get("/promo", adminController.viewPromo);
// router.post("/diskon", upload, adminController.addDiskon);
// router.put("/diskon", upload, adminController.editDiskon);
// router.delete("/diskon/:id", adminController.deleteDiskon);

//ENDPOINT DETAIL ITEM
router.get(
  "/promo/show-detail-promo/:promoId",
  adminController.viewDetailPromo
);
router.post("/promo/add/item/:promoId", adminController.addItemtoPromo);
router.delete("/promo/:id/item/:itemId", adminController.deleteItemtoPromo);
// /admin/promo/<%= promo[0].id %>/item/<%= promo[0].itemId[i].id %>
// router.put("/item/update/feature", upload, adminController.editFeature);
// router.delete("/item/:itemId/feature/:id", adminController.deleteFeature);

// ENDPOINT HISTORY
router.get("/histori", adminController.viewOrder);
// router.get("/pesanan", adminController.viewPesanan);
// router.delete("/stok/ada/:id", adminController.setStokAda);
// router.delete("/stok/kosong/:id", adminController.setStokKosong);

module.exports = router;
