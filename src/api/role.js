import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllRolesQuery = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => api.get("roles").then(({ data }) => data),
  });
};

export const useGetAllModelsQuery = () => {
  return useQuery({
    queryKey: ["roles", "models"],
    queryFn: () => api.get("roles/models").then(({ data }) => data),
  });
};

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("roles", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("role successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating role"), type: "error" }),
  });
};

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, payload }) => api.patch(`roles/${roleId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("role successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating role"), type: "error" }),
  });
};
