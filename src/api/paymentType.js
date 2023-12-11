import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllPaymentTypesQuery = () => {
  return useQuery({
    queryKey: ["paymentTypes"],
    queryFn: () => api.get("paymentTypes").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreatePaymentTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("paymentTypes", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentTypes"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("payment type successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating payment type"), type: "error" }),
  });
};

export const useUpdatePaymentTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentTypeId, payload }) => api.patch(`paymentTypes/${paymentTypeId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentTypes"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("payment type successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating payment type"), type: "error" }),
  });
};
