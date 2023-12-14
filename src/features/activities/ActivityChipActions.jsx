import { Button, Group, Loader } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useUpdateActivityMutation } from "src/api/activity";

const ActivityChipActions = ({ activity }) => {
  const updateActivityMutation = useUpdateActivityMutation();

  const canUpdateActivity = true;

  const handleUpdateMutation = (activityStatus) => {
    updateActivityMutation.mutate({ activityId: activity._id, payload: { activityStatus } });
  };

  if (updateActivityMutation.isPending) return <Loader size={"sm"} />;

  if (canUpdateActivity && activity.activityStatus === "pending") {
    return (
      <Group gap={"xs"}>
        <Button size="xs" color="teal" variant="light" leftSection={<IconCheck size={18} />} onClick={() => handleUpdateMutation("approved")}>
          Approve
        </Button>
        <Button size="xs" color="red" variant="light" leftSection={<IconX size={18} />} onClick={() => handleUpdateMutation("rejected")}>
          Reject
        </Button>
      </Group>
    );
  }
};

export default ActivityChipActions;
