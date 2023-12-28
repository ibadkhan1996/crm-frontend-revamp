import { Button, Drawer, Flex, Grid, Stack, TextInput } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import DateRangeInput from "src/components/DateRangeInput";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import LeadStagesMultiSelect from "src/features/leadStages/LeadStagesMultiSelect";
import LeadStatusMultiSelect from "src/features/leadStatus/LeadStatusMultiSelect";
import { createSearchQuery, resetSearch, selectLeadSearchState, setBrands, setDateRange, setEmail, setFrontSellers, setLeadId, setLeadStages, setLeadStatus, setName, setPpcExecutives } from "src/redux/slice/leadSearchSlice";
import FrontSellersMultiSelect from "../users/FrontSellersMultiSelect";
import PpcExecutivesMultiSelect from "../users/PpcExecutivesMultiSelect";

const LeadSearchDrawer = (props) => {
  const leadSearchState = useSelector(selectLeadSearchState);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createSearchQuery());
  };

  return (
    <Drawer {...props} tt={"capitalize"}>
      <Flex component="form" direction={"column"} h={"100%"} onSubmit={handleSubmit}>
        <Stack style={{ flex: 1 }}>
          <TextInput label="lead ID" data-autofocus placeholder={upperFirst("enter lead id")} tt={"capitalize"} value={leadSearchState._id || ""} onChange={(e) => dispatch(setLeadId(e.target.value))} />
          <TextInput label="lead name" placeholder={upperFirst("enter lead name")} tt={"capitalize"} value={leadSearchState.title || ""} onChange={(e) => dispatch(setName(e.target.value))} />
          <TextInput type="email" label="lead email" placeholder={upperFirst("enter lead email")} tt={"capitalize"} value={leadSearchState.email || ""} onChange={(e) => dispatch(setEmail(e.target.value))} />
          <BrandsMultiSelect multiSelectProps={{ label: "brand", placeholder: upperFirst("select brands"), hidePickedOptions: true, value: leadSearchState.brand || [], onChange: (e) => dispatch(setBrands(e)) }} />
          <PpcExecutivesMultiSelect
            multiSelectProps={{ label: "ppc executive", placeholder: upperFirst("select ppc executives"), hidePickedOptions: true, value: leadSearchState.ppcExecutive || [], onChange: (e) => dispatch(setPpcExecutives(e)) }}
            {...(!!leadSearchState.brand && { queryObject: { brands: { $in: leadSearchState.brand } } })}
          />
          <FrontSellersMultiSelect
            multiSelectProps={{ label: "front seller", placeholder: upperFirst("select front sellers"), hidePickedOptions: true, value: leadSearchState.frontSeller || [], onChange: (e) => dispatch(setFrontSellers(e)) }}
            {...(!!leadSearchState.brand && { queryObject: { brands: { $in: leadSearchState.brand } } })}
          />
          <LeadStatusMultiSelect multiSelectProps={{ label: "lead status", placeholder: upperFirst("select lead status"), hidePickedOptions: true, value: leadSearchState.leadStatus || [], onChange: (e) => dispatch(setLeadStatus(e)) }} />
          <LeadStagesMultiSelect multiSelectProps={{ label: "lead stage", placeholder: upperFirst("select lead stages"), hidePickedOptions: true, value: leadSearchState.leadStage || [], onChange: (e) => dispatch(setLeadStages(e)) }} />
          <DateRangeInput label="date range" placeholder={upperFirst("select date range")} tt={"capitalize"} range={leadSearchState.createdAt} setRange={(e) => dispatch(setDateRange(e))} />

          <div style={{ position: "sticky", bottom: 16, marginTop: "auto", backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", zIndex: 2 }}>
            <Grid grow mt={"lg"}>
              <Grid.Col span={6}>
                <Button type="submit" fullWidth>
                  Search leads
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button type="button" fullWidth onClick={() => dispatch(resetSearch())}>
                  Reset search
                </Button>
              </Grid.Col>
              <Grid.Col>
                <Button type="button" fullWidth>
                  Export leads
                </Button>
              </Grid.Col>
            </Grid>
          </div>
        </Stack>
      </Flex>
    </Drawer>
  );
};

export default LeadSearchDrawer;
