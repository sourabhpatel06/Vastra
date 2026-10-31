// controllers/wishlist.controller.js
import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    const exists = wishlist.items.find(
      (item) => item.product.toString() === productId
    );

    if (!exists) {
      wishlist.items.push({ product: productId });
      await wishlist.save();
    }

    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    console.error("Add to wishlist failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: "items.product",
      model: Product,
    });

    res.status(200).json({ items: wishlist?.items || [] });
  } catch (error) {
    console.error("Get wishlist failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  const productId = req.params.productId;

  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error("Remove wishlist item failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
