import Product from "../models/product.model.js";

// ✅ Get all products with optional category filter
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ✅ Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    console.error("Error getting product by ID:", err.message);
    res.status(500).json({ message: "Failed to get product" });
  }
};

// ✅ Create new product (Admin)
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file ? req.file.filename : "";

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image: `/uploads/${image}`,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("Product creation failed:", err.message);
    res.status(400).json({ message: "Product creation failed" });
  }
};

// ✅ Update product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = {
      title,
      description,
      price,
      category,
    };

    if (image) updateFields.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    console.error("Product update failed:", err.message);
    res.status(400).json({ message: "Product update failed" });
  }
};

// ✅ Delete product (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error("Product deletion failed:", err.message);
    res.status(400).json({ message: "Product deletion failed" });
  }
};
