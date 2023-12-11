import { apiSlice } from ".";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "categories",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } = categoryApiSlice;
