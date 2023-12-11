import { apiSlice } from ".";

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: (query) => ({
        url: "brands",
        method: "GET",
        params: query,
      }),
      providesTags: ["brands"],
    }),
    createBrand: builder.mutation({
      query: (payload) => ({
        url: "brands",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});

export const { useGetAllBrandsQuery, useCreateBrandMutation } = brandApiSlice;
