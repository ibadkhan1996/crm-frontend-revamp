import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllLeadStagesQuery } from "src/api/leadStage";
import MultiSelect from "src/components/MultiSelect";

const LeadStagesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const leadStages = useGetAllLeadStagesQuery(queryObject);

  if (leadStages.isFetching) return <Skeleton height={36} />;

  if (leadStages.isSuccess) return <MultiSelect data={leadStages.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default LeadStagesMultiSelect;
