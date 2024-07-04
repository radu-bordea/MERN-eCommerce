// Importing the PRODUCTS_URL and UPLOAD_URL constants from the constants file and apiSlice from the apiSlice file.
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Injecting endpoints into the existing apiSlice for product-related operations.
export const productsApiSlice = apiSlice.injectEndpoints({
  // Defining the endpoints for the productsApiSlice.
  endpoints: (builder) => ({
    // Adding a getProducts endpoint with a query for fetching a list of products.
    getProducts: builder.query({
      // Defining the query for the getProducts query.
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL, // Setting the URL for the products request.
        params: {
          keyword, // Adding keyword parameter for filtering products.
          pageNumber, // Adding pageNumber parameter for pagination.
        },
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache.
      providesTags: ["Products"], // Tags to provide for cache invalidation.
    }),
    
    // Adding a getProductDetails endpoint with a query for fetching details of a single product by ID.
    getProductDetails: builder.query({
      // Defining the query for the getProductDetails query.
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // Setting the URL for the product details request, including the product ID.
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache.
    }),
    
    // Adding a createProduct endpoint with a mutation for creating a new product.
    createProduct: builder.mutation({
      // Defining the query for the createProduct mutation.
      query: () => ({
        url: PRODUCTS_URL, // Setting the URL for the create product request.
        method: "POST", // HTTP method for the request.
      }),
      invalidatesTags: ["Product"], // Tags to invalidate for cache invalidation.
    }),
    
    // Adding an updateProduct endpoint with a mutation for updating an existing product.
    updateProduct: builder.mutation({
      // Defining the query for the updateProduct mutation.
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`, // Setting the URL for the update product request, including the product ID.
        method: "PUT", // HTTP method for the request.
        body: data, // The body of the request, containing the update data.
      }),
      invalidatesTags: ["Products"], // Tags to invalidate for cache invalidation.
    }),
    
    // Adding an uploadProductImage endpoint with a mutation for uploading a product image.
    uploadProductImage: builder.mutation({
      // Defining the query for the uploadProductImage mutation.
      query: (data) => ({
        url: `${UPLOAD_URL}`, // Setting the URL for the upload image request.
        method: "POST", // HTTP method for the request.
        body: data, // The body of the request, containing the image data.
      }),
    }),
    
    // Adding a deleteProduct endpoint with a mutation for deleting a product.
    deleteProduct: builder.mutation({
      // Defining the query for the deleteProduct mutation.
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // Setting the URL for the delete product request, including the product ID.
        method: "DELETE", // HTTP method for the request.
      }),
    }),
    
    // Adding a createReview endpoint with a mutation for creating a new review.
    createReview: builder.mutation({
      // Defining the query for the createReview mutation.
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`, // Setting the URL for the create review request, including the product ID.
        method: "POST", // HTTP method for the request.
        body: data, // The body of the request, containing the review data.
      }),
      invalidatesTags: ["Product"], // Tags to invalidate for cache invalidation.
    }),
    
    // Adding a getTopProducts endpoint with a query for fetching top-rated products.
    getTopProducts: builder.query({
      // Defining the query for the getTopProducts query.
      query: () => ({
        url: `${PRODUCTS_URL}/top`, // Setting the URL for the top products request.
      }),
      keepUnusedDataFor: 5, // Time in seconds to keep unused data in cache.
    }),
  }),
});

// Exporting hooks for using the getProducts and getProductDetails queries, as well as the createProduct, updateProduct, uploadProductImage, and deleteProduct mutations in components.
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery, // Added correct export for useGetTopProductsQuery
} = productsApiSlice;
