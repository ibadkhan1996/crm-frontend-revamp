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
    getAllActiveOrderServices: builder.query({
      query: () => ({
        url: "services/active",
        method: "GET",
      }),
      providesTags: ["orderServices", "active"],
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

export const { useGetAllOrderServicesQuery, useGetAllActiveOrderServicesQuery, useCreateOrderServiceMutation } = orderServiceApiSlice;
