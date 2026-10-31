// routes/order.routes.js
import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/order.controller.js";
import { verifyUser, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User: Create an order
router.post("/", verifyUser, createOrder);

// User: View own orders
router.get("/user", verifyUser, getUserOrders);

// Admin: View all orders
router.get("/", verifyAdmin, getAllOrders);

export default router;
