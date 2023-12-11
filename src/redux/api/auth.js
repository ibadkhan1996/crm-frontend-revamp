import { apiSlice } from ".";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } = authApiSlice;
