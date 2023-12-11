import { Button, Drawer, Group, Stack, TextInput } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import DateRangeInput from "src/components/DateRangeInput";
import { createSearchQuery, resetSearch, selectOrderSearchState, setAccountManagers, setBrands, setClientEmail, setClientName, setDateRange, setOrderId, setOrderTypes, setPaymentGateways, setPaymentTypes } from "src/redux/slice/orderSearchSlice";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import OrderTypesMultiSelect from "src/features/orderTypes/OrderTypesMultiSelect";
import PaymentGatewaysMultiSelect from "src/features/paymentGateways/PaymentGatewaysMultiSelect";
import PaymentTypesMultiSelect from "src/features/paymentTypes/PaymentTypesMultiSelect";
import AccountManagersMultiSelect from "src/features/users/AccountManagersMultiSelect";

const OrderSearchDrawer = (props) => {
  const orderSearchState = useSelector(selectOrderSearchState);

  const dispatch = useDispatch();

  return (
    <Drawer {...props} tt={"capitalize"} position="right">
      <Stack align="space-between">
        <Stack>
          <TextInput label="order ID" data-autofocus placeholder={upperFirst("enter order id")} tt={"capitalize"} value={orderSearchState._id || ""} onChange={(e) => dispatch(setOrderId(e.target.value))} />
          <TextInput label="client name" placeholder={upperFirst("enter client name")} tt={"capitalize"} value={orderSearchState.title || ""} onChange={(e) => dispatch(setClientName(e.target.value))} />
          <TextInput type="email" label="client email" placeholder={upperFirst("enter client email")} tt={"capitalize"} value={orderSearchState.email || ""} onChange={(e) => dispatch(setClientEmail(e.target.value))} />
          <BrandsMultiSelect multiSelectProps={{ label: "brand", placeholder: upperFirst("select brands"), hidePickedOptions: true, value: orderSearchState.brand || [], onChange: (e) => dispatch(setBrands(e)) }} />
          <AccountManagersMultiSelect
            multiSelectProps={{ label: "account manager", placeholder: upperFirst("select account managers"), hidePickedOptions: true, value: orderSearchState.user || [], onChange: (e) => dispatch(setAccountManagers(e)) }}
          />
          <OrderTypesMultiSelect multiSelectProps={{ label: "order type", placeholder: upperFirst("select order types"), hidePickedOptions: true, value: orderSearchState.orderType || [], onChange: (e) => dispatch(setOrderTypes(e)) }} />
          <PaymentTypesMultiSelect multiSelectProps={{ label: "payment type", placeholder: upperFirst("select payment types"), hidePickedOptions: true, value: orderSearchState.paymentType || [], onChange: (e) => dispatch(setPaymentTypes(e)) }} />
          <PaymentGatewaysMultiSelect
            multiSelectProps={{ label: "payment gateway", placeholder: upperFirst("select payment gateways"), hidePickedOptions: true, value: orderSearchState.paymentGateway || [], onChange: (e) => dispatch(setPaymentGateways(e)) }}
          />
          <DateRangeInput label="date range" placeholder={upperFirst("select date range")} tt={"capitalize"} range={orderSearchState.createdAt} setRange={(e) => dispatch(setDateRange(e))} />
        </Stack>

        <Stack style={{ position: "sticky", bottom: 16, backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", paddingTop: 16, zIndex: 2 }}>
          <Group grow>
            <Button onClick={() => dispatch(createSearchQuery())}>Search orders</Button>
            <Button onClick={() => dispatch(resetSearch())}>Reset search</Button>
          </Group>
          <Button>Export orders</Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default OrderSearchDrawer;
