// Import the apiSlice object from the local file apiSlice.js
import { apiSlice } from "./apiSlice";
// Import the ORDERS_URL constant from the constants.js file
import { ORDERS_URL } from "../constants";

// Define an ordersApiSlice by injecting endpoints into the existing apiSlice
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create an endpoint for creating a new order
    createOrder: builder.mutation({
      // Define the query for the createOrder mutation
      query: (order) => ({
        // Set the URL for the request to the ORDERS_URL
        url: ORDERS_URL,
        // Specify that the HTTP method for the request is POST
        method: "POST",
        // Attach the order object as the request body
        body: { ...order },
      }),
    }),
  }),
});

// Export the auto-generated hook for the createOrder mutation
export const { useCreateOrderMutation } = ordersApiSlice;
