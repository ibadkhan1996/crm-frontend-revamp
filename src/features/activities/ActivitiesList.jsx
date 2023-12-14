import { Button, Loader, Stack } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { IconClockCancel, IconX } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useGetActivitiesWithPaginationInfiniteQuery } from "src/api/activity";
import Placeholder from "src/components/Placeholder";
import ActivityChip from "./ActivityChip";

const ActivitiesList = ({ query = {} }) => {
  const activities = useGetActivitiesWithPaginationInfiniteQuery({ pageSize: 10, query });
  const fetchMoreActivities = () => activities.fetchNextPage();

  const loadMoreButtonRef = useRef(null);

  const { ref, entry } = useIntersection({ root: loadMoreButtonRef.current, threshold: 1 });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchMoreActivities();
    }
  }, [entry?.isIntersecting]);

  if (activities.isLoading) return <Loader />;

  if (activities.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (activities.isSuccess && !activities.data.pages[0]?.data.length) return <Placeholder title={"No activities to display"} icon={<IconClockCancel size={50} />} />;

  if (activities.isSuccess && !!activities.data.pages[0]?.data.length)
    return (
      <Stack>
        {activities.data.pages.map((page) =>
          page.data.map((activity) => {
            return <ActivityChip key={activity._id} activity={activity} />;
          })
        )}

        {activities.hasNextPage && (
          <Button ref={ref} size="xs" w={"max-content"} mx={"auto"} onClick={fetchMoreActivities} loading={activities.isFetchingNextPage}>
            Load more
          </Button>
        )}
      </Stack>
    );
};

export default ActivitiesList;
