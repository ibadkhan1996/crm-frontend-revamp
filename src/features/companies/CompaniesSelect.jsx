import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllCompaniesQuery } from "src/api/company";
import Select from "src/components/Select";

const CompaniesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const companies = useGetAllCompaniesQuery(queryObject);

  if (companies.isFetching) return <Skeleton height={36} />;

  if (companies.isSuccess) return <Select data={companies.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default CompaniesSelect;
