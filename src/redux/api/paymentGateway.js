import { apiSlice } from ".";

export const paymentGatewayApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentGateways: builder.query({
      query: () => ({
        url: "paymentGateways",
        method: "GET",
      }),
      providesTags: ["paymentGateways"],
    }),
    createPaymentGateway: builder.mutation({
      query: (payload) => ({
        url: "paymentGateways",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["paymentGateways"],
    }),
  }),
});

export const { useGetAllPaymentGatewaysQuery, useCreatePaymentGatewayMutation } = paymentGatewayApiSlice;
