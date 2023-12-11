import { apiSlice } from ".";

export const orderTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrderTypes: builder.query({
      query: () => ({
        url: "types",
        method: "GET",
      }),
      providesTags: ["orderTypes"],
    }),
    createOrderType: builder.mutation({
      query: (payload) => ({
        url: "types",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orderTypes"],
    }),
  }),
});

export const { useGetAllOrderTypesQuery, useCreateOrderTypeMutation } = orderTypeApiSlice;
