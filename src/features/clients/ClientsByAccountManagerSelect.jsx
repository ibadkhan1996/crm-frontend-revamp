import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetClientsByAccountManagerQuery } from "src/api/client";
import Select from "src/components/Select";

const ClientsByAccountManagerSelect = ({ selectProps = {}, accountManagerId = "" }) => {
  const clientsByAccountManager = useGetClientsByAccountManagerQuery(accountManagerId);

  if (clientsByAccountManager.isFetching) return <Skeleton height={36} />;

  if (clientsByAccountManager.isSuccess)
    return <Select data={clientsByAccountManager.data} tt="capitalize" selectLabel="title" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default ClientsByAccountManagerSelect;
