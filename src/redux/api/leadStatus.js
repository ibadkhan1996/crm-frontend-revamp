import { apiSlice } from ".";

export const leadStatusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeadStatus: builder.query({
      query: () => ({
        url: "leadStatus",
        method: "GET",
      }),
      providesTags: ["leadStatus"],
    }),
    createLeadStatus: builder.mutation({
      query: (payload) => ({
        url: "leadStatus",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["leadStatus"],
    }),
  }),
});

export const { useGetAllLeadStatusQuery, useCreateLeadStatusMutation } = leadStatusApiSlice;
