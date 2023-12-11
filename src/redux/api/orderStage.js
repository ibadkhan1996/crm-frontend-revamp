import { apiSlice } from ".";

export const orderStageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrderStages: builder.query({
      query: () => ({
        url: "stages",
        method: "GET",
      }),
      providesTags: ["orderStages"],
    }),
    getOrderStagesByOrderType: builder.query({
      query: (orderTypeId) => ({
        url: `stages/byType/${orderTypeId}`,
        method: "GET",
      }),
      providesTags: (result, error, args) => [{ type: "orderStages", id: args }],
    }),
    createOrderStage: builder.mutation({
      query: (payload) => ({
        url: "stages",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orderStages"],
    }),
  }),
});

export const { useGetAllOrderStagesQuery, useGetOrderStagesByOrderTypeQuery, useCreateOrderStageMutation } = orderStageApiSlice;
