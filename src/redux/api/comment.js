import { apiSlice } from ".";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (payload) => ({
        url: "comments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["comments", "clients"],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApiSlice;
