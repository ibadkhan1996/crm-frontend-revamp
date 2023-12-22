import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetClientsWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () => api.get("clients", { params }).then(({ data }) => data),
  });
};

export const useGetClientsByAccountManagerQuery = (accountManagerId) => {
  return useQuery({
    queryKey: ["clients", "by account manager", accountManagerId],
    queryFn: () => api.get(`clients/byAccountManager/${accountManagerId}`).then(({ data }) => data),
    enabled: !!accountManagerId,
  });
};

export const useGetClientsByBrandQuery = (brandId) => {
  return useQuery({
    queryKey: ["clients", "by brand", brandId],
    queryFn: () => api.get(`clients/byBrand/${brandId}`).then(({ data }) => data),
    enabled: !!brandId,
  });
};

export const useGetClientsSummaryByClientStatusQuery = (params) => {
  return useQuery({
    queryKey: ["clients", "summary", params],
    queryFn: () => api.get("clients/summary", { params }).then(({ data }) => data),
  });
};

export const useGetClientByIdQuery = (clientId) => {
  return useQuery({
    queryKey: ["clients", clientId],
    queryFn: () => api.get(`clients/${clientId}`).then(({ data }) => data),
  });
};

export const useCreateClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("clients", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("client successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating client"), type: "error" }),
  });
};

export const useUpdateClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, payload }) => api.patch(`clients/${clientId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("client successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating client"), type: "error" }),
  });
};

export const useDeleteClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId) => api.delete(`clients/${clientId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("client successfully deleted"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error deleting client"), type: "error" }),
  });
};
