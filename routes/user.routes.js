import express from "express";
import User from "../models/user.model.js";
import { isAuth, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users (admin only)
router.get("/users", isAuth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user by ID (admin only)
router.delete("/users/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;
