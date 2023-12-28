import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetPpcExecutivesQuery } from "src/api/user";
import Select from "src/components/Select";

const PpcExecutivesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const ppcExecutives = useGetPpcExecutivesQuery(queryObject);

  if (ppcExecutives.isFetching) return <Skeleton height={36} />;

  if (ppcExecutives.isSuccess) return <Select data={ppcExecutives.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default PpcExecutivesSelect;
