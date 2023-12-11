import { Badge, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import EditLeadStageModalButton from "./EditLeadStageModalButton";

const LeadStagesList = ({ leadStages = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }}>
      {leadStages.map((leadStage) => {
        return (
          <Paper key={leadStage._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {leadStage.title}
                </Text>
                <Badge color={MANTINE_VARIANTS[leadStage.className]}>{`${leadStage.title} - ${leadStage.percentage}%`}</Badge>
              </div>

              <EditLeadStageModalButton leadStage={leadStage} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default LeadStagesList;
