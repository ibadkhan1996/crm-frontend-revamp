import { apiSlice } from ".";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientsWithPagination: builder.query({
      query: (query) => ({
        url: "clients",
        method: "GET",
        params: query,
      }),
      providesTags: (result, error, query) => [{ type: "clients", id: query }],
    }),
    getClientsByBrand: builder.query({
      query: (query) => ({
        url: "clients/byBrand",
        method: "GET",
        params: query,
      }),
      providesTags: [{ type: "clients", id: "by brand" }],
    }),
    getClientsSummaryByClientStatus: builder.query({
      query: (query) => ({
        url: "clients/summary",
        method: "GET",
        params: query,
      }),
      providesTags: [{ type: "clients", id: "summary by client status" }],
    }),
    createClient: builder.mutation({
      query: (payload) => ({
        url: "clients",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["clients"],
    }),
    updateClient: builder.mutation({
      query: ({ id, payload }) => ({
        url: `clients/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["clients"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["clients"],
    }),
  }),
});

export const { useCreateClientMutation, useGetClientsByBrandQuery, useGetClientsWithPaginationQuery, useGetClientsSummaryByClientStatusQuery, useUpdateClientMutation, useDeleteClientMutation } = clientApiSlice;
