import { apiSlice } from ".";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => ({
        url: "companies",
        method: "GET",
      }),
      providesTags: ["companies"],
    }),
    createCompany: builder.mutation({
      query: (payload) => ({
        url: "companies",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["companies"],
    }),
  }),
});

export const { useGetAllCompaniesQuery, useCreateCompanyMutation } = companyApiSlice;
