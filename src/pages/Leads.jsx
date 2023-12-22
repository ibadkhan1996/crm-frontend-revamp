import { Stack } from "@mantine/core";
import { useSelector } from "react-redux";
import LeadSearchBar from "src/features/leads/LeadSearchBar";
import { selectLeadSearchQuery } from "src/redux/slice/leadSearchSlice";

const Leads = () => {
  const leadSearchQuery = useSelector(selectLeadSearchQuery);

  return (
    <Stack gap={"lg"}>
      <LeadSearchBar />
    </Stack>
  );
};

export default Leads;
