import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import EditDepartmentModalButton from "./EditDepartmentModalButton";

const DepartmentsList = ({ departments = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {departments.map((department) => {
        return (
          <Paper key={department._id} p={"sm"} withBorder>
            <Group gap={"sm"} justify="space-between">
              <Text fw={500} tt={"capitalize"}>
                {department.title}
              </Text>

              <EditDepartmentModalButton department={department} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default DepartmentsList;
