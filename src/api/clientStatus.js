import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllClientStatusQuery = () => {
  return useQuery({
    queryKey: ["clientStatus"],
    queryFn: () => api.get("statuses").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateClientStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("statuses", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["clientStatus"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("client status successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating client status"), type: "error" }),
  });
};

export const useUpdateClientStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientStatusId, payload }) => api.patch(`statuses/${clientStatusId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["clientStatus"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("client status successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating client status"), type: "error" }),
  });
};
