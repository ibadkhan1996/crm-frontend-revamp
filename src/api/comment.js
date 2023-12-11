import { upperFirst } from "@mantine/hooks";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetCommentsWithPaginationInfiniteQuery = (params) => {
  return useInfiniteQuery({
    queryKey: ["comments", params],
    queryFn: ({ pageParam: page = 1 }) => api.get("comments", { params: { ...params, page } }).then(({ data }) => data),
    getNextPageParam: ({ page, totalPages }) => (page < totalPages ? parseInt(page) + 1 : undefined),
  });
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("comments", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("comment successfully added"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error adding comment"), type: "error" }),
  });
};

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, payload }) => api.patch(`comments/${commentId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("comment successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating comment"), type: "error" }),
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => api.delete(`comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("comment successfully deleted"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error deleting comment"), type: "error" }),
  });
};
