import { apiSlice } from ".";

export const leadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation({
      query: (payload) => ({
        url: "leads",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["leads"],
    }),
  }),
});

export const { useCreateLeadMutation } = leadApiSlice;
