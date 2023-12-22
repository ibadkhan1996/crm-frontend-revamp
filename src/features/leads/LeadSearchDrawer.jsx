import { Button, Drawer, Group, Stack, TextInput } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import DateRangeInput from "src/components/DateRangeInput";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import LeadStagesMultiSelect from "src/features/leadStages/LeadStagesMultiSelect";
import LeadStatusMultiSelect from "src/features/leadStatus/LeadStatusMultiSelect";
import { createSearchQuery, resetSearch, selectLeadSearchState, setBrands, setDateRange, setEmail, setLeadId, setLeadStages, setLeadStatus, setName } from "src/redux/slice/leadSearchSlice";

const LeadSearchDrawer = (props) => {
  const leadSearchState = useSelector(selectLeadSearchState);

  const dispatch = useDispatch();

  return (
    <Drawer {...props} tt={"capitalize"} position="right">
      <Stack align="space-between">
        <Stack>
          <TextInput label="lead ID" data-autofocus placeholder={upperFirst("enter lead id")} tt={"capitalize"} value={leadSearchState._id || ""} onChange={(e) => dispatch(setLeadId(e.target.value))} />
          <TextInput label="lead name" placeholder={upperFirst("enter lead name")} tt={"capitalize"} value={leadSearchState.title || ""} onChange={(e) => dispatch(setName(e.target.value))} />
          <TextInput type="email" label="lead email" placeholder={upperFirst("enter lead email")} tt={"capitalize"} value={leadSearchState.email || ""} onChange={(e) => dispatch(setEmail(e.target.value))} />
          <BrandsMultiSelect multiSelectProps={{ label: "brand", placeholder: upperFirst("select brands"), hidePickedOptions: true, value: leadSearchState.brand || [], onChange: (e) => dispatch(setBrands(e)) }} />
          <LeadStatusMultiSelect multiSelectProps={{ label: "lead status", placeholder: upperFirst("select lead status"), hidePickedOptions: true, value: leadSearchState.leadStatus || [], onChange: (e) => dispatch(setLeadStatus(e)) }} />
          <LeadStagesMultiSelect multiSelectProps={{ label: "lead stage", placeholder: upperFirst("select lead stages"), hidePickedOptions: true, value: leadSearchState.leadStage || [], onChange: (e) => dispatch(setLeadStages(e)) }} />
          <DateRangeInput label="date range" placeholder={upperFirst("select date range")} tt={"capitalize"} range={leadSearchState.createdAt} setRange={(e) => dispatch(setDateRange(e))} />
        </Stack>

        <Stack style={{ position: "sticky", bottom: 16, backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", paddingTop: 16, zIndex: 2 }}>
          <Group grow>
            <Button onClick={() => dispatch(createSearchQuery())}>Search leads</Button>
            <Button onClick={() => dispatch(resetSearch())}>Reset search</Button>
          </Group>
          <Button>Export leads</Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default LeadSearchDrawer;
