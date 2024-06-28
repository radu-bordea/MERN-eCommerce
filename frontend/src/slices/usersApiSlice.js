// Importing the USERS_URL constant from the constants file and apiSlice from the apiSlice file.
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Injecting endpoints into the existing apiSlice.
export const usersApiSlice = apiSlice.injectEndpoints({
  // Defining the endpoints for the usersApiSlice.
  endpoints: (builder) => ({
    // Adding a login endpoint with a mutation for handling login requests.
    login: builder.mutation({
      // Defining the query for the login mutation.
      query: (data) => ({
        // Setting the URL for the login request.
        url: `${USERS_URL}/auth`, // Endpoint for authentication
        method: "POST", // HTTP method for the request
        body: data, // The body of the request, containing the login data
      }),
    }),
    // Adding a register endpoint with a mutation for handling registration requests.
    register: builder.mutation({
      // Defining the query for the register mutation.
      query: (data) => ({
        url: `${USERS_URL}`, // Endpoint for user registration
        method: "POST", // HTTP method for the request
        body: data, // The body of the request, containing the registration data
      }),
    }),
    // Adding a logout endpoint with a mutation for handling logout requests.
    logout: builder.mutation({
      // Defining the query for the logout mutation.
      query: () => ({
        url: `${USERS_URL}/logout`, // Endpoint for logging out
        method: "POST", // HTTP method for the request
      }),
    }),
    // Adding a profile endpoint with a mutation for handling profile update requests.
    profile: builder.mutation({
      // Defining the query for the profile mutation.
      query: (data) => ({
        url: `${USERS_URL}/profile`, // Endpoint for updating user profile
        method: "PUT", // HTTP method for the request
        body: data, // The body of the request, containing the profile update data
      }),
    }),
    // Adding a getUsers endpoint with a query for fetching a list of users.
    getUsers: builder.query({
      // Defining the query for the getUsers endpoint.
      query: () => ({
        url: USERS_URL, // Endpoint for fetching users
      }),
      providesTags: ["Users"], // Tags to provide for cache invalidation
      keepUnusedDataFor: 5, // Time to keep unused data in cache
    }),
    // Adding a deleteUser endpoint with a mutation for handling user deletion requests.
    deleteUser: builder.mutation({
      // Defining the query for the deleteUser mutation.
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`, // Endpoint for deleting a user
        method: "DELETE", // HTTP method for the request
      }),
    }),
    // Adding a getUserDetails endpoint with a query for fetching details of a specific user.
    getUserDetails: builder.query({
      // Defining the query for the getUserDetails endpoint.
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`, // Endpoint for fetching user details
      }),
      keepUnusedDataFor: 5, // Time to keep unused data in cache
    }),
    // Adding an updateUser endpoint with a mutation for handling user update requests.
    updateUser: builder.mutation({
      // Defining the query for the updateUser mutation.
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`, // Endpoint for updating a user
        method: "PUT", // HTTP method for the request
        body: data, // The body of the request, containing the update data
      }),
      invalidatesTags: ["Users"], // Tags to invalidate for cache invalidation
    }),
  }),
});

// Exporting the useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, and useUpdateUserMutation hooks for use in components.
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
