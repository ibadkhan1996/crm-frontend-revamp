import { Group } from "@mantine/core";
import AddCommentModalButton from "src/features/comments/AddCommentModalButton";
import DeleteLeadButton from "./DeleteLeadButton";
import EditLeadButton from "./EditLeadButton";

const LeadsTableRowActions = ({ lead }) => {
  return (
    <Group gap={"sm"} justify="center">
      <AddCommentModalButton documentId={lead._id} documentReference={"lead"} />

      <EditLeadButton lead={lead} compact />

      <DeleteLeadButton leadId={lead._id} />
    </Group>
  );
};

export default LeadsTableRowActions;
