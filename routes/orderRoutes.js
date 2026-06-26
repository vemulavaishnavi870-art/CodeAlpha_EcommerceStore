const express = require("express");

const {
  placeOrder,
  getUserOrders,
} = require("../controllers/orderController");

const router = express.Router();

// Place Order
router.post("/", placeOrder);

// Get Orders of a User
router.get("/:userId", getUserOrders);

module.exports = router;