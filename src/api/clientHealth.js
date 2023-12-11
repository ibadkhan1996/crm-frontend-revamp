import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllClientHealthQuery = () => {
  return useQuery({
    queryKey: ["clientHealth"],
    queryFn: () => api.get("health").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateClientHealthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("health", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["clientHealth"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("client health successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating client health"), type: "error" }),
  });
};

export const useUpdateClientHealthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientHealthId, payload }) => api.patch(`health/${clientHealthId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["clientHealth"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("client health successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating client health"), type: "error" }),
  });
};
