import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
} from "../controllers/userController.js";  // Import user controller functions
import { protect, admin } from "../middleware/authMiddleware.js";  // Import authentication and authorization middleware

// Route to register a new user and get a list of all users (admin only)
router.route("/")
  .post(registerUser)  // POST request to register a new user
  .get(protect, admin, getUsers);  // GET request to get all users, protected and admin only

// Route to logout the user
router.post("/logout", logoutUser);  // POST request to logout the user

// Route to authenticate the user
router.post("/auth", authUser);  // POST request to authenticate the user and get a token

// Routes for user profile
router.route("/profile")
  .get(protect, getUserProfile)  // GET request to get the user's profile, protected
  .put(protect, updateUserProfile);  // PUT request to update the user's profile, protected

// Routes for user by ID
router.route("/:id")
  .delete(protect, admin, deleteUser)  // DELETE request to delete a user by ID, protected and admin only
  .get(protect, admin, getUserByID)  // GET request to get a user by ID, protected and admin only
  .put(protect, admin, updateUser);  // PUT request to update a user by ID, protected and admin only

export default router;  // Export the router
