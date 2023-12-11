import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllClientHealthQuery } from "src/api/clientHealth";
import Select from "src/components/Select";

const ClientHealthSelect = ({ selectProps = {}, queryObject = {} }) => {
  const clientHealth = useGetAllClientHealthQuery(queryObject);

  if (clientHealth.isFetching) return <Skeleton height={36} />;

  if (clientHealth.isSuccess) return <Select data={clientHealth.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default ClientHealthSelect;
