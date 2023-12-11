import { Group } from "@mantine/core";
import AddCommentModalButton from "src/features/comments/AddCommentModalButton";
import DeleteClientButton from "./DeleteClientButton";
import EditClientButton from "./EditClientButton";

const ClientsTableRowActions = ({ client }) => {
  return (
    <Group gap={"sm"} justify="center">
      <AddCommentModalButton documentId={client._id} documentReference={"client"} />

      <EditClientButton client={client} compact />

      <DeleteClientButton clientId={client._id} />
    </Group>
  );
};

export default ClientsTableRowActions;
