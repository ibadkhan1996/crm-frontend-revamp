import { apiSlice } from ".";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getAccountManagers: builder.query({
      query: (query) => ({
        url: "users/accountManagers",
        method: "GET",
        params: query,
      }),
      providesTags: [{ type: "users", id: "account managers" }],
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: "users",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAccountManagersQuery, useCreateUserMutation } = userApiSlice;
