import { apiSlice } from ".";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: () => ({
        url: "departments",
        method: "GET",
      }),
      providesTags: ["departments"],
    }),
    createDepartment: builder.mutation({
      query: (payload) => ({
        url: "departments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["departments"],
    }),
  }),
});

export const { useGetAllDepartmentsQuery, useCreateDepartmentMutation } = departmentApiSlice;
