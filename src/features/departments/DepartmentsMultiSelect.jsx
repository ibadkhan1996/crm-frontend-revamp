import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllDepartmentsQuery } from "src/api/department";
import MultiSelect from "src/components/MultiSelect";

const DepartmentsMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const departments = useGetAllDepartmentsQuery(queryObject);

  if (departments.isFetching) return <Skeleton height={36} />;

  if (departments.isSuccess) return <MultiSelect data={departments.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default DepartmentsMultiSelect;
