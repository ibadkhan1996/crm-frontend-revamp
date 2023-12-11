import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllDepartmentsQuery } from "src/api/department";
import Select from "src/components/Select";

const DepartmentsSelect = ({ selectProps = {}, queryObject = {} }) => {
  const departments = useGetAllDepartmentsQuery(queryObject);

  if (departments.isFetching) return <Skeleton height={36} />;

  if (departments.isSuccess) return <Select data={departments.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default DepartmentsSelect;
