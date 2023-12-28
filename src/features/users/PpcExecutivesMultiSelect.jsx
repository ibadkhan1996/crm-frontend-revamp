import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetPpcExecutivesQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";

const PpcExecutivesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const ppcExecutives = useGetPpcExecutivesQuery(queryObject);

  if (ppcExecutives.isFetching) return <Skeleton height={36} />;

  if (ppcExecutives.isSuccess) return <MultiSelect data={ppcExecutives.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default PpcExecutivesMultiSelect;
