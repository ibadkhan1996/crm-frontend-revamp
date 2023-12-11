import { upperFirst } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useCreateLeadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("leads", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["leads"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("lead successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating lead"), type: "error" }),
  });
};
