import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllClientStatusQuery } from "src/api/clientStatus";
import MultiSelect from "src/components/MultiSelect";

const ClientStatusMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const clientStatus = useGetAllClientStatusQuery(queryObject);

  if (clientStatus.isFetching) return <Skeleton height={36} />;

  if (clientStatus.isSuccess) return <MultiSelect data={clientStatus.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default ClientStatusMultiSelect;
