import { Loader, Stack } from "@mantine/core";
import { useGetAllLeadStagesQuery } from "src/api/leadStage";
import AddLeadStageModalButton from "./AddLeadStageModalButton";
import LeadStagesList from "./LeadStagesList";

const LeadStages = () => {
  const leadStages = useGetAllLeadStagesQuery();

  if (leadStages.isLoading) return <Loader />;

  if (leadStages.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (leadStages.isSuccess && !leadStages.data?.length) return <Placeholder title={"No lead stages to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={"xl"}>
      <AddLeadStageModalButton />

      <LeadStagesList leadStages={leadStages.data} />
    </Stack>
  );
};

export default LeadStages;
