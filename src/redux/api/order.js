import { apiSlice } from ".";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersWithPagination: builder.query({
      query: (query) => ({
        url: "orders",
        method: "GET",
        params: query,
      }),
      providesTags: (result, error, query) => [{ type: "orders", id: query }],
    }),
    getOrdersSummary: builder.query({
      query: (query) => ({
        url: "orders/summary",
        method: "GET",
        params: query,
      }),
      providesTags: [{ type: "orders", id: "summary" }],
    }),
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "orders",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, payload }) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersWithPaginationQuery, useUpdateOrderMutation, useDeleteOrderMutation, useGetOrdersSummaryQuery } = orderApiSlice;
