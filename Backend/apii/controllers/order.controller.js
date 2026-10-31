// controllers/order.controller.js
import Order from "../models/order.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      total,
      shippingAddress, // optional: include address/phone
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// Get all orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "title price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all orders", error: err.message });
  }
};
