import { apiSlice } from ".";

export const paymentTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentTypes: builder.query({
      query: () => ({
        url: "paymentTypes",
        method: "GET",
      }),
      providesTags: ["paymentTypes"],
    }),
    createPaymentType: builder.mutation({
      query: (payload) => ({
        url: "paymentTypes",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["paymentTypes"],
    }),
  }),
});

export const { useGetAllPaymentTypesQuery, useCreatePaymentTypeMutation } = paymentTypeApiSlice;
