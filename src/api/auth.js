import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials) => api.post("auth/login", credentials),
    onSuccess: () => showNotificaton({ title: upperFirst("successfully logged in!"), type: "success" }),
    onError: (error) => showNotificaton({ title: upperFirst(error.response?.data?.message || "error"), type: "error" }),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => api.post("auth/logout"),
    onSuccess: () => showNotificaton({ title: upperFirst("successfully logged out!"), type: "success" }),
    onError: (error) => showNotificaton({ title: upperFirst(error.response?.data?.message || "error"), type: "error" }),
  });
};

export const useRefreshMutation = () => {
  return useQuery({
    queryFn: () => api.get("auth/refresh"),
  });
};
