import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetAllUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("users").then(({ data }) => data),
  });
};

export const useGetAccountManagersQuery = (params) => {
  return useQuery({
    queryKey: ["users", "account managers", params],
    queryFn: () => api.get("users/accountManagers", { params }).then(({ data }) => data),
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("users", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("user successfully created"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error creating user"), type: "error" }),
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }) => api.patch(`users/${userId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("user successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating user"), type: "error" }),
  });
};
