import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// ✅ Middleware to check if the user is authenticated
export const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use lean() to return plain JS object (not Mongoose doc)
    const user = await User.findById(decoded.id).select("-password").lean();

    req.user = user;

    console.log("🔐 Authenticated User:", user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ✅ Middleware to check if the user is admin
export const isAdmin = (req, res, next) => {
  console.log("🔐 ADMIN CHECK:", req.user?.isAdmin); // Optional chaining

  if (req.user && req.user.isAdmin === true) {
    return next();
  } else {
    return res.status(403).json({ message: "Admin access denied" });
  }
};

// ✅ Aliases (Optional)
export const verifyUser = isAuth;
export const verifyAdmin = isAdmin;
