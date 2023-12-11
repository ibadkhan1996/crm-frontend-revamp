import { apiSlice } from ".";

export const clientHealthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClientHealth: builder.query({
      query: () => ({
        url: "health",
        method: "GET",
      }),
      providesTags: ["clientHealth"],
    }),
    createClientHealth: builder.mutation({
      query: (payload) => ({
        url: "health",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["clientHealth"],
    }),
  }),
});

export const { useGetAllClientHealthQuery, useCreateClientHealthMutation } = clientHealthApiSlice;
