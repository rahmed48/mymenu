const router = require("express").Router();
const apiController = require("../controllers/apiController");
// const { upload } = require("../middlewares/multer");

router.get("/item", apiController.item);
router.get("/detail-item/:id", apiController.detailItem);
router.get("/select-category/:id", apiController.selectCategory);
router.get("/toko", apiController.toko);
router.get("/home", apiController.home);
router.get("/pesanan", apiController.pesanan);
router.post("/cart", apiController.cart);
// router.get("/detail-page/:id", apiController.detailPage);

module.exports = router;
