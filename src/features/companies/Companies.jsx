import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllCompaniesQuery } from "src/api/company";
import Placeholder from "src/components/Placeholder";
import AddCompanyModalButton from "./AddCompanyModalButton";
import CompaniesList from "./CompaniesList";

const Companies = () => {
  const companies = useGetAllCompaniesQuery();

  if (companies.isLoading) return <Loader />;

  if (companies.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (companies.isSuccess && !companies.data?.length) return <Placeholder title={"No companies to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddCompanyModalButton />

        <CompaniesList companies={companies.data} />
      </Stack>
    </Paper>
  );
};

export default Companies;
