const Cart = require("../models/Cart");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    const cartItem = await Cart.create({
      user,
      product,
      quantity,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.params.userId })
      .populate("product")
      .populate("user", "-password");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};