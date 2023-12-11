import { Badge, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import EditLeadStatusModalButton from "./EditLeadStatusModalButton";

const LeadStatusList = ({ leadStatus = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {leadStatus.map((status) => {
        return (
          <Paper key={status._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {status.title}
                </Text>
                <Badge color={MANTINE_VARIANTS[status.className]}>{status.title}</Badge>
              </div>

              <EditLeadStatusModalButton leadStatus={status} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default LeadStatusList;
