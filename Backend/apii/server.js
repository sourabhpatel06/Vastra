import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3002"],
  credentials: true,
}));


app.use(express.json());


const __dirname = path.resolve(); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🚏 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
// 🧪 Default route
app.get("/", (req, res) => {
  res.send("API is running");
});

// 🚀 Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
