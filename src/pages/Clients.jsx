import { Stack } from "@mantine/core";
import { useSelector } from "react-redux";
import ClientSearchBar from "src/features/clients/ClientSearchBar";
import ClientsSummaryByClientStatus from "src/features/clients/ClientsSummaryByClientStatus";
import ClientsTable from "src/features/clients/ClientsTable";
import { selectClientSearchQuery } from "src/redux/slice/clientSearchSlice";

const Clients = () => {
  const clientSearchQuery = useSelector(selectClientSearchQuery);

  return (
    <Stack gap={"lg"}>
      <ClientSearchBar />

      <ClientsSummaryByClientStatus query={clientSearchQuery} />

      <ClientsTable query={clientSearchQuery} />
    </Stack>
  );
};

export default Clients;
