import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllDepartmentsQuery = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => api.get("departments").then(({ data }) => data),
    staleTime: Infinity,
  });
};

export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("departments", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("department successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating department"), type: "error" }),
  });
};

export const useUpdateDepartmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ departmentId, payload }) => api.patch(`departments/${departmentId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("department successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating department"), type: "error" }),
  });
};
