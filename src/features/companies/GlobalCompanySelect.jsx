import { useLocalStorage } from "@mantine/hooks";
import CompaniesSelect from "src/features/companies/CompaniesSelect";

const GlobalCompanySelect = () => {
  const [globalFilters, setGlobalFilters, removeGlobalFilters] = useLocalStorage({ key: "globalFilters", defaultValue: {} });

  const handleGlobalFilters = (value) => {
    if (!!value) {
      setGlobalFilters({ company: value });
    } else {
      removeGlobalFilters();
    }
  };

  return <CompaniesSelect selectProps={{ placeholder: "Select a company", clearable: true, searchable: false, value: globalFilters.company || "", onChange: handleGlobalFilters }} />;
};

export default GlobalCompanySelect;
