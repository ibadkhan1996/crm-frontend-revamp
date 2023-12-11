import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllCompaniesQuery } from "src/api/company";
import MultiSelect from "src/components/MultiSelect";

const CompaniesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const companies = useGetAllCompaniesQuery(queryObject);

  if (companies.isFetching) return <Skeleton height={36} />;

  if (companies.isSuccess) return <MultiSelect data={companies.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default CompaniesMultiSelect;
