import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "src/constants/SERVER_URL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}api`,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token.accessToken}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: [
    "companies",
    "brands",
    "departments",
    "roles",
    "users",
    "categories",
    "leadStatus",
    "leadStages",
    "clientStatus",
    "clientHealth",
    "orderTypes",
    "orderStages",
    "orderServices",
    "paymentTypes",
    "paymentGateways",
    "clients",
    "orders",
    "comments",
  ],
});
