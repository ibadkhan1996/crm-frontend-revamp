import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllOrderServicesQuery = () => {
  return useQuery({
    queryKey: ["orderServices"],
    queryFn: () => api.get("services").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateOrderServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("services", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orderServices"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("order service successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating order service"), type: "error" }),
  });
};

export const useUpdateOrderServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderServiceId, payload }) => api.patch(`services/${orderServiceId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orderServices"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("order service successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating order service"), type: "error" }),
  });
};
