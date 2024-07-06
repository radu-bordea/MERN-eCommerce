// Import necessary functions from @reduxjs/toolkit and a utility function for updating the cart
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// Initialize the cart state. If there's a cart stored in localStorage, parse and use it; otherwise, start with an empty cart.
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

// Create a slice for the cart with an initial state and reducers to handle state changes
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state of the cart
  reducers: {
    // Reducer to handle adding items to the cart
    addToCart: (state, action) => {
      const item = action.payload; // Get the item to be added from the action payload

      // Check if the item already exists in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If the item exists, replace it with the new item
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If the item does not exist, add it to the cart
        state.cartItems = [...state.cartItems, item];
      }

      // Update the cart state and persist the changes (likely in localStorage)
      return updateCart(state);
    },
    // Reducer to handle removing items from the cart
    removeFromCart: (state, action) => {
      // Filter out the item to be removed
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      // Update the cart state and persist the changes
      return updateCart(state);
    },
    // Reducer to handle saving the shipping address
    saveShippingAddress: (state, action) => {
      // Set the shipping address
      state.shippingAddress = action.payload;

      // Update the cart state and persist the changes
      return updateCart(state);
    },
    // Reducer to handle saving the payment method
    savePaymentMethod: (state, action) => {
      // Set the payment method
      state.paymentMethod = action.payload;

      // Update the cart state and persist the changes
      return updateCart(state);
    },
    // Reducer to handle clearing the cart items
    clearCartItems: (state, action) => {
      // Clear the cart items
      state.cartItems = [];

      // Update the cart state and persist the changes
      return updateCart(state);
    },
    // Reset cart to the initial state
    resetCart: (state) => (state = initialState),
  },
});

// Export the actions for use in other parts of the application
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

// Export the reducer to be included in the store
export default cartSlice.reducer;
