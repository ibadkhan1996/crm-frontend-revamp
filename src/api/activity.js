import { upperFirst } from "@mantine/hooks";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotificaton } from "src/notifications/showNotification";
import api from ".";

export const useGetActivitiesWithPaginationInfiniteQuery = (params) => {
  return useInfiniteQuery({
    queryKey: ["activities", params],
    queryFn: ({ pageParam: page = 1 }) => api.get("activities", { params: { ...params, page } }).then(({ data }) => data),
    getNextPageParam: ({ page, totalPages }) => (page < totalPages ? parseInt(page) + 1 : undefined),
  });
};

export const useUpdateActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activityId, payload }) => api.patch(`activities/${activityId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["activities"]);
      showNotificaton({ title: upperFirst("done!"), message: upperFirst("activity successfully updated"), type: "success" });
    },
    onError: (error) => showNotificaton({ title: upperFirst("error!"), message: upperFirst(error.response?.data?.message || "error updating activity"), type: "error" }),
  });
};
