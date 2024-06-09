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
        // Setting the URL for the login request. Note: `USERS_URL / auth` should be `USERS_URL + "/auth"`.
        url: `${USERS_URL}/auth`,
        method: 'POST', // HTTP method for the request.
        body: data // The body of the request, containing the login data.
      }),
    }),
  }),
});

// Exporting the useLoginMutation hook for use in components.
export const { useLoginMutation } = usersApiSlice;
