import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllLeadStatusQuery } from "src/api/leadStatus";
import MultiSelect from "src/components/MultiSelect";

const LeadStatusMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const leadStatus = useGetAllLeadStatusQuery(queryObject);

  if (leadStatus.isFetching) return <Skeleton height={36} />;

  if (leadStatus.isSuccess) return <MultiSelect data={leadStatus.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default LeadStatusMultiSelect;
