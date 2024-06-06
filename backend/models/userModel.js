import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the user schema with fields and validation
const userSchema = new mongoose.Schema(
  {
    // User's name
    name: {
      type: String,
      required: true,  // Name is required
    },
    // User's email
    email: {
      type: String,
      required: true,  // Email is required
    },
    // User's password
    password: {
      type: String,
      required: true,  // Password is required
    },
    // Flag to check if the user is an admin
    isAdmin: {
      type: Boolean,
      required: true,  // isAdmin flag is required
      default: false,  // Default value is false
    },
  },
  {
    timestamps: true,  // Automatically add createdAt and updatedAt timestamps
  }
);

// Instance method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // If the password field is not modified, move to the next middleware
  if (!this.isModified("password")) {
    next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password with the generated salt
});

// Create the User model using the userSchema
const User = mongoose.model("User", userSchema);

export default User;  // Export the User model
