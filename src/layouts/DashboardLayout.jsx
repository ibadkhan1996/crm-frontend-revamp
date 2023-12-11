import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Box p={"lg"}>
      <Outlet />
    </Box>
  );
};

export default DashboardLayout;
