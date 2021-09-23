const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { upload } = require("../middlewares/multer");

router.get("/home", apiController.home);
router.post("/cart", apiController.cart);
// router.get("/orders", apiController.orders);
// router.get("/pesanan", apiController.pesanan);
// router.get("/detail-item/:id", apiController.detailItem);
// router.get("/select-category/:id", apiController.selectCategory);
// router.get("/detail-page/:id", apiController.detailPage);

module.exports = router;
