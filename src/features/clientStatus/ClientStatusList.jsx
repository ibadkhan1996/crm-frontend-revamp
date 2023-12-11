import { Badge, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import EditClientStatusModalButton from "./EditClientStatusModalButton";

const ClientStatusList = ({ clientStatus = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {clientStatus.map((status) => {
        return (
          <Paper key={status._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {status.title}
                </Text>
                <Badge color={MANTINE_VARIANTS[status.className]}>{status.title}</Badge>
              </div>

              <EditClientStatusModalButton clientStatus={status} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default ClientStatusList;
