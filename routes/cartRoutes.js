const express = require("express");

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

// Add Product to Cart
router.post("/", addToCart);

// Get User Cart
router.get("/:userId", getCart);

// Remove Item from Cart
router.delete("/:id", removeFromCart);

module.exports = router;