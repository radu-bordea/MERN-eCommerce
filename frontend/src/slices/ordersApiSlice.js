// Import the apiSlice object from the local file apiSlice.js
import { apiSlice } from "./apiSlice";
// Import the ORDERS_URL constant from the constants.js file
import { ORDERS_URL } from "../constants";

// Define an ordersApiSlice by injecting endpoints into the existing apiSlice
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create an endpoint for creating a new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

// Export the auto-generated hook for the createOrder mutation
export const { useCreateOrderMutation } = ordersApiSlice;
