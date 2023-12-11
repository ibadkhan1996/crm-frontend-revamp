import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllBrandsQuery = (params) => {
  return useQuery({
    queryKey: ["brands", params],
    queryFn: () => api.get("brands", { params }).then(({ data }) => data),
  });
};

export const useCreateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("brands", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("brand successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating brand"), type: "error" }),
  });
};

export const useUpdateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, payload }) => api.patch(`brands/${brandId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("brand successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating brand"), type: "error" }),
  });
};
