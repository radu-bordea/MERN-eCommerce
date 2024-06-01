// Import the createApi and fetchBaseQuery functions from the Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Import the base URL constant from the constants module
import { BASE_URL } from "../constants";

// Create a base query using fetchBaseQuery with the specified base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Define an API slice using createApi
export const apiSlice = createApi({
  // Set the base query for the API
  baseQuery,
  // Define the tag types for caching and automatic refetching
  tagTypes: ["Product", "Order", "User"],
  // Define the endpoints for the API; currently empty but will be populated later
  endpoints: (builder) => ({}),
});
