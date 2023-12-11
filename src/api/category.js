import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("categories").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("categories", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("category successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating category"), type: "error" }),
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, payload }) => api.patch(`categories/${categoryId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("category successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating category"), type: "error" }),
  });
};
