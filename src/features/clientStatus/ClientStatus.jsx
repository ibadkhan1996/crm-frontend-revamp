import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllClientStatusQuery } from "src/api/clientStatus";
import Placeholder from "src/components/Placeholder";
import AddClientStatusModalButton from "./AddClientStatusModalButton";
import ClientStatusList from "./ClientStatusList";

const ClientStatus = () => {
  const clientStatus = useGetAllClientStatusQuery();

  if (clientStatus.isLoading) return <Loader />;

  if (clientStatus.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (clientStatus.isSuccess && !clientStatus.data?.length) return <Placeholder title={"No client status to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={"xl"}>
      <AddClientStatusModalButton />

      <ClientStatusList clientStatus={clientStatus.data} />
    </Stack>
  );
};

export default ClientStatus;
