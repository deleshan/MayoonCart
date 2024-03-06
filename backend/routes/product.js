const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const router = express.Router();
const { authUser, adminUser } = require("../middlewares/authenticate");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(authUser, createReview);

//Admin routes
router
  .route("/admin/product/new")
  .post(authUser, adminUser("admin"), upload.array("images"), newProduct);
router
  .route("/admin/products")
  .get(authUser, adminUser("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .delete(authUser, adminUser("admin"), deleteProduct);
router
  .route("/admin/product/:id")
  .put(authUser, adminUser("admin"), upload.array("images"), updateProduct);
router.route("/admin/reviews").get(authUser, adminUser("admin"), getReviews);
router
  .route("/admin/review")
  .delete(authUser, adminUser("admin"), deleteReview);

module.exports = router;
