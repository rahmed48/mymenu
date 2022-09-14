var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("admin/signin");
});

module.exports = router;

///////////////////////////////////////////////////////////////////////////

// var express = require("express");
// var router = express.Router();

// /* GET home page. */
// router.get("/", function (req, res) {
//   res.render("index", { name: "Rahmad" });
// });

// module.exports = router;
