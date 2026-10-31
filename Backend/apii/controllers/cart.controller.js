import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // If item already in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Else add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Add to cart failed:", error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// ✅ Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product", // populate only inside items
      model: Product,
    });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ message: "Error getting cart" });
  }
};

// ✅ Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const productId = req.params.productId;

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart failed:", error);
    res.status(500).json({ message: "Error removing item" });
  }
};
