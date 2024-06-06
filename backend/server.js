import express from "express";
import dotenv from "dotenv";  // Load environment variables from a .env file
import cookieParser from "cookie-parser";  // Middleware to parse cookies
dotenv.config();  // Initialize environment variables
import connectDB from "./config/db.js";  // Import function to connect to MongoDB
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";  // Custom error handling middleware
import productRoutes from "./routes/productRoutes.js";  // Import product routes
import userRoutes from "./routes/userRoutes.js";  // Import user routes
const port = process.env.PORT || 5000;  // Define the port for the server

connectDB();  // Connect to MongoDB

const app = express();  // Initialize Express application

// Body parser middleware to handle JSON and URL-encoded data
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Cookie parser middleware to handle cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");  // Basic route to check if the API is running
});

// Define routes for products and users
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Middleware to handle 404 errors (Not Found)
app.use(notFound);

// Middleware to handle general errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server running on port ${port}`));
