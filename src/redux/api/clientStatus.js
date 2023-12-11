import { apiSlice } from ".";

export const clientStatusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClientStatus: builder.query({
      query: () => ({
        url: "statuses",
        method: "GET",
      }),
      providesTags: ["clientStatus"],
    }),
    createClientStatus: builder.mutation({
      query: (payload) => ({
        url: "statuses",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["clientStatus"],
    }),
  }),
});

export const { useGetAllClientStatusQuery, useCreateClientStatusMutation } = clientStatusApiSlice;
