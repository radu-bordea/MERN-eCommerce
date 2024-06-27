// Importing the PRODUCTS_URL constant from the constants file and apiSlice from the apiSlice file.
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Injecting endpoints into the existing apiSlice for product-related operations.
export const productsApiSlice = apiSlice.injectEndpoints({
  // Defining the endpoints for the productsApiSlice.
  endpoints: (builder) => ({
    // Adding a getProducts endpoint with a query for fetching a list of products.
    getProducts: builder.query({
      // Defining the query for the getProducts query.
      query: () => ({
        url: PRODUCTS_URL, // Setting the URL for the products request.
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache.
      providesTags: ["Products"],
    }),
    // Adding a getProductDetails endpoint with a query for fetching details of a single product by ID.
    getProductDetails: builder.query({
      // Defining the query for the getProductDetails query.
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // Setting the URL for the product details request, including the product ID.
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache.
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Exporting hooks for using the getProducts and getProductDetails queries in components.
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation
} = productsApiSlice;
