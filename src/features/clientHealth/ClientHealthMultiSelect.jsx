import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllClientHealthQuery } from "src/api/clientHealth";
import MultiSelect from "src/components/MultiSelect";

const ClientHealthMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const clientHealth = useGetAllClientHealthQuery(queryObject);

  if (clientHealth.isFetching) return <Skeleton height={36} />;

  if (clientHealth.isSuccess) return <MultiSelect data={clientHealth.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default ClientHealthMultiSelect;
