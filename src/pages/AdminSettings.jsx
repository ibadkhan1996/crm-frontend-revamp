import { Paper, ScrollArea, Tabs } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Brands from "src/features/brands/Brands";
import Categories from "src/features/categories/Categories";
import ClientHealth from "src/features/clientHealth/ClientHealth";
import ClientStatus from "src/features/clientStatus/ClientStatus";
import Companies from "src/features/companies/Companies";
import Departments from "src/features/departments/Departments";
import LeadStages from "src/features/leadStages/LeadStages";
import LeadStatus from "src/features/leadStatus/LeadStatus";
import OrderServices from "src/features/orderServices/OrderServices";
import OrderStages from "src/features/orderStages/OrderStages";
import OrderTypes from "src/features/orderTypes/OrderTypes";
import PaymentGateways from "src/features/paymentGateways/PaymentGateways";
import PaymentTypes from "src/features/paymentTypes/PaymentTypes";
import Roles from "src/features/roles/Roles";
import Uploads from "src/features/uploads/Uploads";
import Users from "src/features/users/Users";

const tabList = [
  { label: upperFirst("companies"), value: "companies", component: <Companies /> },
  { label: upperFirst("brands"), value: "brands", component: <Brands /> },
  { label: upperFirst("departments"), value: "departments", component: <Departments /> },
  { label: upperFirst("role and permissions"), value: "role-and-permissions", component: <Roles /> },
  { label: upperFirst("users"), value: "users", component: <Users /> },
  { label: upperFirst("categories"), value: "categories", component: <Categories /> },
  { label: upperFirst("lead status"), value: "lead-status", component: <LeadStatus /> },
  { label: upperFirst("lead stages"), value: "lead-stages", component: <LeadStages /> },
  { label: upperFirst("client status"), value: "client-status", component: <ClientStatus /> },
  { label: upperFirst("client health"), value: "client-health", component: <ClientHealth /> },
  { label: upperFirst("order types"), value: "order-types", component: <OrderTypes /> },
  { label: upperFirst("order stages"), value: "order-stages", component: <OrderStages /> },
  { label: upperFirst("order services"), value: "order-services", component: <OrderServices /> },
  { label: upperFirst("payment types"), value: "payment-types", component: <PaymentTypes /> },
  { label: upperFirst("payment gateways"), value: "payment-gateways", component: <PaymentGateways /> },
  { label: upperFirst("uploads"), value: "uploads", component: <Uploads /> },
];

const AdminSettings = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const defaultTabValue = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <>
      <Tabs variant="pills" mb={"lg"} defaultValue={defaultTabValue} onChange={(value) => navigate(value)}>
        <ScrollArea w={"100%"} offsetScrollbars scrollbarSize={10} type="always">
          <Paper withBorder p={6}>
            <Tabs.List style={{ flexWrap: "nowrap" }}>
              {tabList.map((tab, i) => {
                return (
                  <Tabs.Tab key={i} value={tab.value}>
                    {tab.label}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
          </Paper>
        </ScrollArea>
      </Tabs>

      <Routes>
        {tabList.map((tab, i) => {
          return <Route key={i} path={tab.value} element={tab.component} />;
        })}
      </Routes>
    </>
  );
};

export default AdminSettings;
