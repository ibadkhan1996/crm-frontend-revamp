import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllLeadStatusQuery } from "src/api/leadStatus";
import Select from "src/components/Select";

const LeadStatusSelect = ({ selectProps = {}, queryObject = {} }) => {
  const leadStatus = useGetAllLeadStatusQuery(queryObject);

  if (leadStatus.isFetching) return <Skeleton height={36} />;

  if (leadStatus.isSuccess) return <Select data={leadStatus.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default LeadStatusSelect;
