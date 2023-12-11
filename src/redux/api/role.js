import { apiSlice } from ".";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        url: "roles",
        method: "GET",
      }),
      providesTags: ["roles"],
    }),
    getAllModels: builder.query({
      query: () => ({
        url: "roles/models",
        method: "GET",
      }),
      providesTags: [{ type: "roles", id: "models" }],
    }),
  }),
});

export const { useGetAllRolesQuery, useGetAllModelsQuery } = roleApiSlice;
