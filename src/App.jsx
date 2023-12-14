import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login.jsx";
import AddClient from "./features/clients/AddClient.jsx";
import ClientDetails from "./features/clients/ClientDetails.jsx";
import AddLead from "./features/leads/AddLead.jsx";
import AddOrder from "./features/orders/AddOrder.jsx";
import OrderDetails from "./features/orders/OrderDetails.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Activities from "./pages/Activities.jsx";
import AdminSettings from "./pages/AdminSettings.jsx";
import Clients from "./pages/Clients.jsx";
import Orders from "./pages/Orders.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="leads">
          <Route path="new" element={<AddLead />} />
        </Route>

        <Route path="clients">
          <Route index element={<Clients />} />
          <Route path="new" element={<AddClient />} />
          <Route path=":id" element={<ClientDetails />} />
        </Route>

        <Route path="orders">
          <Route index element={<Orders />} />
          <Route path="new" element={<AddOrder />} />
          <Route path=":id" element={<OrderDetails />} />
        </Route>

        <Route path="activities">
          <Route index element={<Activities />} />
        </Route>

        <Route path="admin-settings/*" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default App;
