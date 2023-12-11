import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import EditRoleModalButton from "./EditRoleModalButton";

const RolesList = ({ roles = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {roles.map((role) => {
        return (
          <Paper key={role._id} p={"sm"} withBorder>
            <Group gap={"sm"} justify="space-between">
              <Text fw={500} tt={"capitalize"}>
                {role.title}
              </Text>

              <EditRoleModalButton role={role} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default RolesList;
