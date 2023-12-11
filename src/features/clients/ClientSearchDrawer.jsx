import { Button, Drawer, Group, Stack, TextInput } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import DateRangeInput from "src/components/DateRangeInput";
import { createSearchQuery, resetSearch, selectClientSearchState, setAccountManagers, setBrands, setCategories, setClientEmail, setClientHealth, setClientId, setClientName, setClientStatus, setDateRange } from "src/redux/slice/clientSearchSlice";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import CategoriesMultiSelect from "src/features/categories/CategoriesMultiSelect";
import ClientHealthMultiSelect from "src/features/clientHealth/ClientHealthMultiSelect";
import ClientStatusMultiSelect from "src/features/clientStatus/ClientStatusMultiSelect";
import AccountManagersMultiSelect from "src/features/users/AccountManagersMultiSelect";

const ClientSearchDrawer = (props) => {
  const clientSearchState = useSelector(selectClientSearchState);

  const dispatch = useDispatch();

  return (
    <Drawer {...props} tt={"capitalize"} position="right">
      <Stack align="space-between">
        <Stack>
          <TextInput label="client ID" data-autofocus placeholder={upperFirst("enter client id")} tt={"capitalize"} value={clientSearchState._id || ""} onChange={(e) => dispatch(setClientId(e.target.value))} />
          <TextInput label="client name" placeholder={upperFirst("enter client name")} tt={"capitalize"} value={clientSearchState.title || ""} onChange={(e) => dispatch(setClientName(e.target.value))} />
          <TextInput type="email" label="client email" placeholder={upperFirst("enter client email")} tt={"capitalize"} value={clientSearchState.email || ""} onChange={(e) => dispatch(setClientEmail(e.target.value))} />
          <BrandsMultiSelect multiSelectProps={{ label: "brand", placeholder: upperFirst("select brands"), hidePickedOptions: true, value: clientSearchState.brand || [], onChange: (e) => dispatch(setBrands(e)) }} />
          <AccountManagersMultiSelect
            multiSelectProps={{ label: "account manager", placeholder: upperFirst("select account managers"), hidePickedOptions: true, value: clientSearchState.user || [], onChange: (e) => dispatch(setAccountManagers(e)) }}
            {...(!!clientSearchState.brand && { queryObject: { brands: { $in: clientSearchState.brand } } })}
          />
          <CategoriesMultiSelect multiSelectProps={{ label: "category", placeholder: upperFirst("select categories"), hidePickedOptions: true, value: clientSearchState.category || [], onChange: (e) => dispatch(setCategories(e)) }} />
          <ClientStatusMultiSelect multiSelectProps={{ label: "client status", placeholder: upperFirst("select client status"), hidePickedOptions: true, value: clientSearchState.status || [], onChange: (e) => dispatch(setClientStatus(e)) }} />
          <ClientHealthMultiSelect multiSelectProps={{ label: "client health", placeholder: upperFirst("select client health"), hidePickedOptions: true, value: clientSearchState.health || [], onChange: (e) => dispatch(setClientHealth(e)) }} />
          <DateRangeInput label="date range" placeholder={upperFirst("select date range")} tt={"capitalize"} range={clientSearchState.createdAt} setRange={(e) => dispatch(setDateRange(e))} />
        </Stack>

        <Stack style={{ position: "sticky", bottom: 16, backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", paddingTop: 16, zIndex: 2 }}>
          <Group grow>
            <Button onClick={() => dispatch(createSearchQuery())}>Search clients</Button>
            <Button onClick={() => dispatch(resetSearch())}>Reset search</Button>
          </Group>
          <Button>Export clients</Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default ClientSearchDrawer;
