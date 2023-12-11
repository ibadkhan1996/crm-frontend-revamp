import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllLeadStagesQuery } from "src/api/leadStage";
import Select from "src/components/Select";

const LeadStagesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const leadStages = useGetAllLeadStagesQuery(queryObject);

  if (leadStages.isFetching) return <Skeleton height={36} />;

  if (leadStages.isSuccess) return <Select data={leadStages.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default LeadStagesSelect;
