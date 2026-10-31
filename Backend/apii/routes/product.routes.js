import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { isAuth, isAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// 🔓 Public Routes
router.get("/", getAllProducts); // Fetch all products
router.get("/:id", getProductById); // Fetch product by ID

// 🔐 Admin-Protected Routes
router.post("/", isAuth, isAdmin, upload.single("image"), createProduct); // Create product
router.put("/:id", isAuth, isAdmin, upload.single("image"), updateProduct); // Update product
router.delete("/:id", isAuth, isAdmin, deleteProduct); // Delete product

export default router;
