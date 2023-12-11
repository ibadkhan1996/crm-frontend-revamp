import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllPaymentGatewaysQuery = () => {
  return useQuery({
    queryKey: ["paymentGateways"],
    queryFn: () => api.get("paymentGateways").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreatePaymentGatewayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("paymentGateways", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentGateways"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("payment gateway successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating payment gateway"), type: "error" }),
  });
};

export const useUpdatePaymentGatewayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentGatewayId, payload }) => api.patch(`paymentGateways/${paymentGatewayId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentGateways"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("payment gateway successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating payment gateway"), type: "error" }),
  });
};
