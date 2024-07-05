import path from "path";
import express from "express";
import dotenv from "dotenv"; // Load environment variables from a .env file
import cookieParser from "cookie-parser"; // Middleware to parse cookies
dotenv.config(); // Initialize environment variables
import connectDB from "./config/db.js"; // Import function to connect to MongoDB
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Custom error handling middleware
import productRoutes from "./routes/productRoutes.js"; // Import product routes
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
const port = process.env.PORT || 5000; // Define the port for the server

connectDB(); // Connect to MongoDB

const app = express(); // Initialize Express application

// Body parser middleware to handle JSON and URL-encoded data
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Cookie parser middleware to handle cookies
app.use(cookieParser());

// Define routes for products, users, orders
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, ses) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..."); // Basic route to check if the API is running
  });
}

// Middleware to handle 404 errors (Not Found)
app.use(notFound);

// Middleware to handle general errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server running on port ${port}`));
