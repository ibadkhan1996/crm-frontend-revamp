import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllLeadStatusQuery = () => {
  return useQuery({
    queryKey: ["leadStatus"],
    queryFn: () => api.get("leadStatus").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateLeadStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("leadStatus", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["leadStatus"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("lead status successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating lead status"), type: "error" }),
  });
};

export const useUpdateLeadStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leadStatusId, payload }) => api.patch(`leadStatus/${leadStatusId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["leadStatus"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("lead status successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating lead status"), type: "error" }),
  });
};
