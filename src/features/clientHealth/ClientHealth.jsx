import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllClientHealthQuery } from "src/api/clientHealth";
import Placeholder from "src/components/Placeholder";
import AddClientHealthModalButton from "./AddClientHealthModalButton";
import ClientHealthList from "./ClientHealthList";

const ClientHealth = () => {
  const clientHealth = useGetAllClientHealthQuery();

  if (clientHealth.isLoading) return <Loader />;

  if (clientHealth.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (clientHealth.isSuccess && !clientHealth.data?.length) return <Placeholder title={"No client health to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={"xl"}>
      <AddClientHealthModalButton />

      <ClientHealthList clientHealth={clientHealth.data} />
    </Stack>
  );
};

export default ClientHealth;
