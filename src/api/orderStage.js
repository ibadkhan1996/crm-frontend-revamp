import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllOrderStagesQuery = () => {
  return useQuery({
    queryKey: ["orderStages"],
    queryFn: () => api.get("stages").then(({ data }) => data),
  });
};

export const useGetOrderStagesByOrderTypeQuery = (orderTypeId) => {
  return useQuery({
    queryKey: ["orderStages", orderTypeId],
    queryFn: () => api.get(`stages/byType/${orderTypeId}`).then(({ data }) => data),
  });
};

export const useCreateOrderStageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("stages", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orderStages"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("order stage successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating order stage"), type: "error" }),
  });
};

export const useUpdateOrderStageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderStageId, payload }) => api.patch(`stages/${orderStageId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orderStages"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("order stage successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating order stage"), type: "error" }),
  });
};
