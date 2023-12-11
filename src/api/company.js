import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllCompaniesQuery = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: () => api.get("companies").then(({ data }) => data),
  });
};

export const useCreateCompanyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("companies", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("company successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating company"), type: "error" }),
  });
};

export const useUpdateCompanyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, payload }) => api.patch(`companies/${companyId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("company successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating company"), type: "error" }),
  });
};
