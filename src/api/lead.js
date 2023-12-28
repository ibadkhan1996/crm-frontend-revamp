import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetLeadsWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: () => api.get("leads", { params }).then(({ data }) => data),
  });
};

export const useGetLeadByIdQuery = (leadId) => {
  return useQuery({
    queryKey: ["leads", leadId],
    queryFn: () => api.get(`leads/${leadId}`).then(({ data }) => data),
  });
};

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

export const useUpdateLeadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leadId, payload }) => api.patch(`leads/${leadId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["leads"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("lead successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating lead"), type: "error" }),
  });
};

export const useDeleteLeadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leadId) => api.delete(`leads/${leadId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["leads"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("lead successfully deleted"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error deleting lead"), type: "error" }),
  });
};
