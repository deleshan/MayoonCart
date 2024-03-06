const express = require("express");
const { authUser, adminUser } = require("../middlewares/authenticate");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  orders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(authUser, newOrder);
router.route("/order/:id").get(authUser, getSingleOrder);
router.route("/myorders").get(authUser, myOrders);

//Admin routes
router.route("/admin/orders").get(authUser, adminUser("admin"), orders);
router.route("/admin/order/:id").put(authUser, adminUser("admin"), updateOrder);
router
  .route("/admin/order/:id")
  .delete(authUser, adminUser("admin"), deleteOrder);

module.exports = router;
