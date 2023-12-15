import { Badge, Group, Notification, Text } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconActivityHeartbeat, IconBolt } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import formatDate from "src/utils/formatDate";
import ActivityChipActions from "./ActivityChipActions";

const ActivityChip = ({ activity }) => {
  const getActivityIconColor = () => {
    switch (activity.activityStatus) {
      case "approved":
        return "teal";

      case "rejected":
        return "red";

      default:
        return null;
    }
  };

  const getActivityIcon = () => {
    switch (activity.documentField) {
      case "status":
        return <IconBolt size={18} />;

      case "health":
        return <IconActivityHeartbeat size={18} />;

      default:
        return null;
    }
  };

  const getDocumentLink = () => {
    switch (activity.documentReference) {
      case "client":
        return `/clients/${activity.documentId}`;

      default:
        return null;
    }
  };

  const ActivityTitle = () => {
    return (
      <Group gap={4} justify="space-between">
        {upperFirst(`${activity.documentAction} client's ${activity.documentField}`)}

        <Badge color="dimmed" c={"dimmed"} size="sm">
          {formatDate(activity.createdAt)}
        </Badge>
      </Group>
    );
  };

  const activityTitle = upperFirst(`${activity.documentAction} client's ${activity.documentField}`);
  const activityDescription = `${activity.user.email} has requested to ${activity.documentAction} ${activity.documentReference} ${activity.documentField} having document id `;

  return (
    <Notification key={activity._id} py={"sm"} pl={"sm"} icon={getActivityIcon()} color={getActivityIconColor()} title={<ActivityTitle />} bullet={getActivityIcon(activity.documentField)} withCloseButton={false}>
      <Group justify="space-between" align="flex-end">
        <div>
          <Text size="sm" my={4}>
            Update to: {activity?.meta}
          </Text>

          <Text c="dimmed" size="sm">
            {activityDescription}

            <Badge component="span" variant="light">
              <Link to={getDocumentLink()} style={{ textDecoration: "none" }}>
                {activity.documentId}
              </Link>
            </Badge>
          </Text>

          {activity.activityUpdatedBy && (
            <Text size="sm" my={4}>
              {`${upperFirst(activity.activityStatus)} by: ${activity.activityUpdatedBy.email}`}
            </Text>
          )}
        </div>

        <ActivityChipActions activity={activity} />
      </Group>
    </Notification>
  );
};

export default ActivityChip;
