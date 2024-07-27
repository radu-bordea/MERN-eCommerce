// Import the apiSlice object from the local file apiSlice.js
import { apiSlice } from "./apiSlice";
// Import the ORDERS_URL and PAYPAL_URL constants from the constants.js file
import { ORDERS_URL, PAYPAL_URL } from "../constants";

// Define an ordersApiSlice by injecting endpoints into the existing apiSlice
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create an endpoint for creating a new order
    createOrder: builder.mutation({
      // Define the query for creating a new order
      query: (order) => ({
        url: ORDERS_URL, // Endpoint for creating a new order
        method: "POST", // HTTP method for the request
        body: order, // The body of the request, containing the order data
      }),
    }),
    // Create an endpoint for getting order details by order ID
    getOrderDetails: builder.query({
      // Define the query for getting order details
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`, // Endpoint for getting order details
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache
    }),
    // Create an endpoint for paying for an order
    payOrder: builder.mutation({
      // Define the query for paying for an order
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`, // Endpoint for paying for an order
        method: "PUT", // HTTP method for the request
        body: { ...details }, // The body of the request, containing the payment details
      }),
    }),
    // Create an endpoint for getting the PayPal client ID
    getPayPalClientId: builder.query({
      // Define the query for getting the PayPal client ID
      query: () => ({
        url: PAYPAL_URL, // Endpoint for getting the PayPal client ID
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache
    }),
    // Create an endpoint for getting the current user's orders
    getMyOrders: builder.query({
      // Define the query for getting the current user's orders
      query: () => ({
        url: `${ORDERS_URL}/mine`, // Endpoint for getting the current user's orders
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache
    }),
    // Create an endpoint for getting all orders
    getOrders: builder.query({
      // Define the query for getting all orders
      query: ({ pageNumber }) => ({
        url: ORDERS_URL, // Endpoint for getting all orders
        params: {
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache
      providesTags: ["Orders"], // Tags to provide for cache invalidation.
    }),
    // Create an endpoint for marking an order as delivered
    deliverOrder: builder.mutation({
      // Define the query for marking an order as delivered
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`, // Endpoint for marking an order as delivered
        method: "PUT", // HTTP method for the request
      }),
    }),
  }),
});

// Export the auto-generated hooks for the queries and mutations
export const {
  useCreateOrderMutation, // Hook for creating an order
  useGetOrderDetailsQuery, // Hook for getting order details
  usePayOrderMutation, // Hook for paying for an order
  useGetPayPalClientIdQuery, // Hook for getting the PayPal client ID
  useGetMyOrdersQuery, // Hook for getting the current user's orders
  useGetOrdersQuery, // Hook for getting all orders
  useDeliverOrderMutation, // Hook for marking an order as delivered
} = ordersApiSlice;
