import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllLeadStagesQuery = () => {
  return useQuery({
    queryKey: ["leadStages"],
    queryFn: () => api.get("leadStages").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateLeadStageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("leadStages", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["leadStages"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("lead stage successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating lead stage"), type: "error" }),
  });
};

export const useUpdateLeadStageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leadStageId, payload }) => api.patch(`leadStages/${leadStageId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["leadStages"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("lead stage successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating lead stage"), type: "error" }),
  });
};
