import { Paper, Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import ActivitiesList from "src/features/activities/ActivitiesList";
import AccountManagersMultiSelect from "src/features/users/AccountManagersMultiSelect";

const Activities = () => {
  const [activityStatus, setActivityStatus] = useState("pending");
  const [accountManagers, setAccountManagers] = useState([]);

  return (
    <Stack>
      <AccountManagersMultiSelect multiSelectProps={{ tt: "lowercase", placeholder: "Select account managers", value: accountManagers, onChange: setAccountManagers }} />

      <Tabs variant="pills" value={activityStatus} onChange={setActivityStatus}>
        <Paper withBorder p={6}>
          <Tabs.List grow>
            <Tabs.Tab value="pending" tt={"capitalize"}>
              pending
            </Tabs.Tab>

            <Tabs.Tab value="approved" tt={"capitalize"}>
              approved
            </Tabs.Tab>

            <Tabs.Tab value="rejected" tt={"capitalize"}>
              rejected
            </Tabs.Tab>
          </Tabs.List>
        </Paper>
      </Tabs>

      <ActivitiesList query={{ activityStatus, ...(!!accountManagers && { user: { $in: accountManagers } }) }} />
    </Stack>
  );
};

export default Activities;
