import { apiSlice } from ".";

export const orderServiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrderServices: builder.query({
      query: () => ({
        url: "services",
        method: "GET",
      }),
      providesTags: ["orderServices"],
    }),
    createOrderService: builder.mutation({
      query: (payload) => ({
        url: "services",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orderServices"],
    }),
  }),
});

export const { useGetAllOrderServicesQuery, useCreateOrderServiceMutation } = orderServiceApiSlice;
