import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllOrderTypesQuery = () => {
  return useQuery({
    queryKey: ["orderTypes"],
    queryFn: () => api.get("types").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateOrderTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("types", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orderTypes"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("order type successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating order type"), type: "error" }),
  });
};

export const useUpdateOrderTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderTypeId, payload }) => api.patch(`types/${orderTypeId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orderTypes"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("order type successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating order type"), type: "error" }),
  });
};
