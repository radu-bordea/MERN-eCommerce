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
  }),
});

// Exporting the useLoginMutation, useLogoutMutation, and useRegisterMutation hooks for use in components.
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
