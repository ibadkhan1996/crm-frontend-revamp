import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllDepartmentsQuery } from "src/api/department";
import Placeholder from "src/components/Placeholder";
import AddDepartmentModalButton from "./AddDepartmentModalButton";
import DepartmentsList from "./DepartmentsList";

const Departments = () => {
  const departments = useGetAllDepartmentsQuery();

  if (departments.isLoading) return <Loader />;

  if (departments.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (departments.isSuccess && !departments.data?.length) return <Placeholder title={"No departments to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={"xl"}>
      <AddDepartmentModalButton />

      <DepartmentsList departments={departments.data} />
    </Stack>
  );
};

export default Departments;
