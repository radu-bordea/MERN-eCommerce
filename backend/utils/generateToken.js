import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as a cookie in the response
const generateToken = (res, userId) => {
  // Create a JWT token with the userId as the payload, using the secret key from environment variables
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",  // Token expires in 30 days
  });

  // Set the JWT token as an HTTP-only cookie in the response
  res.cookie("jwt", token, {
    httpOnly: true,  // Cookie is only accessible via HTTP(S), not JavaScript
    secure: process.env.NODE_ENV !== "development",  // Cookie is only sent over HTTPS in production
    sameSite: "strict",  // Cookie is only sent for same-site requests to prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000,  // Cookie expires in 30 days (in milliseconds)
  });
};

export default generateToken;
