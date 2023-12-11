import { Stack } from "@mantine/core";
import ClientSearchBar from "src/features/clients/ClientSearchBar";
import ClientsSummaryByClientStatus from "src/features/clients/ClientsSummaryByClientStatus";
import ClientsTable from "src/features/clients/ClientsTable";

const Clients = () => {
  return (
    <Stack gap={"lg"}>
      <ClientSearchBar />

      <ClientsSummaryByClientStatus />

      <ClientsTable />
    </Stack>
  );
};

export default Clients;
