// routes/wishlist.routes.js
import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} from "../controllers/wishlist.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyUser, getWishlist);
router.post("/", verifyUser, addToWishlist);
router.delete("/:productId", verifyUser, removeFromWishlist);

export default router;
