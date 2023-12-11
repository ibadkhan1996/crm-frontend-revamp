import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllClientStatusQuery } from "src/api/clientStatus";
import Select from "src/components/Select";

const ClientStatusSelect = ({ selectProps = {}, queryObject = {} }) => {
  const clientStatus = useGetAllClientStatusQuery(queryObject);

  if (clientStatus.isFetching) return <Skeleton height={36} />;

  if (clientStatus.isSuccess) return <Select data={clientStatus.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default ClientStatusSelect;
