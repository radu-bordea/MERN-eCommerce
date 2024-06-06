import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Middleware to protect routes by checking for a valid JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT token from cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find the user associated with the token and attach user info to the request object, excluding the password
      req.user = await User.findById(decoded.userId).select("-password");

      next();  // Proceed to the next middleware/route handler
    } catch (error) {
      console.log(error);
      res.status(401);  // Unauthorized status
      throw new Error("Not authorized, token failed");  // Throw an error if token verification fails
    }
  } else {
    res.status(401);  // Unauthorized status
    throw new Error("Not authorized, no token");  // Throw an error if no token is found
  }
});

// Middleware to check if the user has admin privileges
const admin = (req, res, next) => {
  // Check if the user exists and if the user is an admin
  if (req.user && req.user.isAdmin) {
    next();  // Proceed to the next middleware/route handler
  } else {
    res.status(401);  // Unauthorized status
    throw new Error("Not authorized as admin");  // Throw an error if the user is not an admin
  }
};

export { protect, admin };  // Export the middleware functions
