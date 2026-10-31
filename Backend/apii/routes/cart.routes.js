// routes/cart.routes.js
import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get cart items
router.get("/", verifyUser, getCart);

// Add to cart
router.post("/", verifyUser, addToCart);

// Optional: remove from cart
router.delete("/:productId", verifyUser, removeFromCart);

export default router;
