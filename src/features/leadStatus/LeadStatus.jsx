import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllLeadStatusQuery } from "src/api/leadStatus";
import Placeholder from "src/components/Placeholder";
import AddLeadStatusModalButton from "./AddLeadStatusModalButton";
import LeadStatusList from "./LeadStatusList";

const LeadStatus = () => {
  const leadStatus = useGetAllLeadStatusQuery();

  if (leadStatus.isLoading) return <Loader />;

  if (leadStatus.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (leadStatus.isSuccess && !leadStatus.data?.length) return <Placeholder title={"No lead status to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddLeadStatusModalButton />

        <LeadStatusList leadStatus={leadStatus.data} />
      </Stack>
    </Paper>
  );
};

export default LeadStatus;
