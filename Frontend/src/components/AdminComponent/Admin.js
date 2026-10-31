import express from "express";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

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
    console.error("Add product error:", error.message);
    res.status(500).json({ message: "Failed to add product" });
  }
});

router.delete("/product/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
