const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.get("/home", apiController.home);
router.get("/toko", apiController.toko);
router.get("/item", apiController.item);
router.post("/cart", apiController.cart);
// router.get("/pesanan", apiController.pesanan);
// router.get("/detail-item/:id", apiController.detailItem);
// router.get("/select-category/:id", apiController.selectCategory);
// router.get("/detail-page/:id", apiController.detailPage);

module.exports = router;
