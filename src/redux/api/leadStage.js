import { apiSlice } from ".";

export const leadStageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeadStages: builder.query({
      query: () => ({
        url: "leadStages",
        method: "GET",
      }),
      providesTags: ["leadStages"],
    }),
    createLeadStage: builder.mutation({
      query: (payload) => ({
        url: "leadStages",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["leadStages"],
    }),
  }),
});

export const { useGetAllLeadStagesQuery, useCreateLeadStageMutation } = leadStageApiSlice;
