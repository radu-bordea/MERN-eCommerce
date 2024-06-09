// Importing createSlice from Redux Toolkit, which is used to create a slice of the Redux state.
import { createSlice } from "@reduxjs/toolkit";

// Initial state definition for the auth slice.
// It checks if there is userInfo stored in localStorage and parses it if available, otherwise sets it to null.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")) // Parse the stored user information if available
    : null, // Set to null if no user information is found in localStorage
};

// Creating the auth slice using createSlice.
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to handle setting credentials
    setCredentials: (state, action) => {
      // Update the state with the payload (new user information)
      state.userInfo = action.payload;
      // Store the new user information in localStorage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // Reducer to handle logout
    logout: (state, action) => {
      // Clear the user information from the state
      state.userInfo = null;
      // Remove the user information from localStorage
      localStorage.removeItem("userInfo");
    },
  },
});

// Exporting the setCredentials and logout action creators to be used in the application.
export const { setCredentials, logout } = authSlice.actions;

// Exporting the auth reducer to be included in the Redux store.
export default authSlice.reducer;
