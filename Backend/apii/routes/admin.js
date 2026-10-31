import express from "express";
import Product from "../models/product.model.js";
import { isAuth, isAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

// @desc   Add a new product (Admin only)
// @route  POST /api/admin/product
router.post("/product", isAuth, isAdmin, async (req, res) => {
  try {
    const { title, description, price, image, category } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      image,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// @desc   Delete a product by ID (Admin only)
// @route  DELETE /api/admin/product/:id
router.delete("/product/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
