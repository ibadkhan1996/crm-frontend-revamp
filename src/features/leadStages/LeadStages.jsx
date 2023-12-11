import { Loader, Paper, Stack } from "@mantine/core";
import { useGetAllLeadStagesQuery } from "src/api/leadStage";
import AddLeadStageModalButton from "./AddLeadStageModalButton";
import LeadStagesList from "./LeadStagesList";

const LeadStages = () => {
  const leadStages = useGetAllLeadStagesQuery();

  if (leadStages.isLoading) return <Loader />;

  if (leadStages.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (leadStages.isSuccess && !leadStages.data?.length) return <Placeholder title={"No lead stages to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddLeadStageModalButton />

        <LeadStagesList leadStages={leadStages.data} />
      </Stack>
    </Paper>
  );
};

export default LeadStages;
