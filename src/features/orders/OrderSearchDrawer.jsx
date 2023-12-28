import { Button, Drawer, Flex, Grid, Stack, TextInput } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import DateRangeInput from "src/components/DateRangeInput";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import OrderTypesMultiSelect from "src/features/orderTypes/OrderTypesMultiSelect";
import PaymentGatewaysMultiSelect from "src/features/paymentGateways/PaymentGatewaysMultiSelect";
import PaymentTypesMultiSelect from "src/features/paymentTypes/PaymentTypesMultiSelect";
import AccountManagersMultiSelect from "src/features/users/AccountManagersMultiSelect";
import { createSearchQuery, resetSearch, selectOrderSearchState, setAccountManagers, setBrands, setClientEmail, setClientName, setDateRange, setOrderId, setOrderTypes, setPaymentGateways, setPaymentTypes } from "src/redux/slice/orderSearchSlice";

const OrderSearchDrawer = (props) => {
  const orderSearchState = useSelector(selectOrderSearchState);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createSearchQuery());
  };

  return (
    <Drawer {...props} tt={"capitalize"}>
      <Flex component="form" direction={"column"} h={"100%"} onSubmit={handleSubmit}>
        <Stack style={{ flex: 1 }}>
          <TextInput label="order ID" data-autofocus placeholder={upperFirst("enter order id")} tt={"capitalize"} value={orderSearchState._id || ""} onChange={(e) => dispatch(setOrderId(e.target.value))} />
          <TextInput label="client name" placeholder={upperFirst("enter client name")} tt={"capitalize"} value={orderSearchState.clientTitle || ""} onChange={(e) => dispatch(setClientName(e.target.value))} />
          <TextInput type="email" label="client email" placeholder={upperFirst("enter client email")} tt={"capitalize"} value={orderSearchState.clientEmail || ""} onChange={(e) => dispatch(setClientEmail(e.target.value))} />
          <BrandsMultiSelect multiSelectProps={{ label: "brand", placeholder: upperFirst("select brands"), hidePickedOptions: true, value: orderSearchState.brand || [], onChange: (e) => dispatch(setBrands(e)) }} />
          <AccountManagersMultiSelect
            multiSelectProps={{ label: "account manager", placeholder: upperFirst("select account managers"), hidePickedOptions: true, value: orderSearchState.user || [], onChange: (e) => dispatch(setAccountManagers(e)) }}
            {...(!!orderSearchState.brand && { queryObject: { brands: { $in: orderSearchState.brand } } })}
          />
          <OrderTypesMultiSelect multiSelectProps={{ label: "order type", placeholder: upperFirst("select order types"), hidePickedOptions: true, value: orderSearchState.orderType || [], onChange: (e) => dispatch(setOrderTypes(e)) }} />
          <PaymentTypesMultiSelect multiSelectProps={{ label: "payment type", placeholder: upperFirst("select payment types"), hidePickedOptions: true, value: orderSearchState.paymentType || [], onChange: (e) => dispatch(setPaymentTypes(e)) }} />
          <PaymentGatewaysMultiSelect
            multiSelectProps={{ label: "payment gateway", placeholder: upperFirst("select payment gateways"), hidePickedOptions: true, value: orderSearchState.paymentGateway || [], onChange: (e) => dispatch(setPaymentGateways(e)) }}
          />
          <DateRangeInput label="date range" placeholder={upperFirst("select date range")} tt={"capitalize"} range={orderSearchState.createdAt} setRange={(e) => dispatch(setDateRange(e))} />

          <div style={{ position: "sticky", bottom: 16, marginTop: "auto", backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", zIndex: 2 }}>
            <Grid grow mt={"lg"}>
              <Grid.Col span={6}>
                <Button type="submit" fullWidth>
                  Search orders
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button type="button" fullWidth onClick={() => dispatch(resetSearch())}>
                  Reset search
                </Button>
              </Grid.Col>
              <Grid.Col>
                <Button type="button" fullWidth>
                  Export orders
                </Button>
              </Grid.Col>
            </Grid>
          </div>
        </Stack>
      </Flex>
    </Drawer>
  );
};

export default OrderSearchDrawer;
