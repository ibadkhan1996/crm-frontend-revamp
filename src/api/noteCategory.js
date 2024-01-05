import { upperFirst } from "@mantine/hooks";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetNoteCategoriesWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["noteCategories", params],
    queryFn: () => api.get("noteCategories", { params }).then(({ data }) => data),
  });
};

export const useGetNoteCategoriesWithPaginationInfiniteQuery = (params) => {
  return useInfiniteQuery({
    queryKey: ["noteCategories", params],
    queryFn: ({ pageParam: page = 1 }) => api.get("noteCategories", { params: { ...params, page } }).then(({ data }) => data),
    getNextPageParam: ({ page, totalPages }) => (page < totalPages ? parseInt(page) + 1 : undefined),
  });
};

export const useGetNoteCategoryByIdQuery = (noteCategoryId) => {
  return useQuery({
    queryKey: ["noteCategories", noteCategoryId],
    queryFn: () => api.get(`noteCategories/${noteCategoryId}`).then(({ data }) => data),
  });
};

export const useCreateNoteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("noteCategories", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["noteCategories"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("note category successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating note category"), type: "error" }),
  });
};

export const useUpdateNoteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteCategoryId, payload }) => api.patch(`noteCategories/${noteCategoryId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["noteCategories"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("note category successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating note category"), type: "error" }),
  });
};

export const useDeleteNoteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteCategoryId) => api.delete(`noteCategories/${noteCategoryId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["noteCategories"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("note category successfully deleted"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error deleting note category"), type: "error" }),
  });
};
