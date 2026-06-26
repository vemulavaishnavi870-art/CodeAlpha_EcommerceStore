const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;

    const order = await Order.create({
      user,
      products,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("user", "-password")
      .populate("products.product");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
};