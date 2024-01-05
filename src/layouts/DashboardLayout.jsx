import { Box, Group } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import ToggleColorSchemeButton from "src/components/ToggleColorSchemeButton";

const DashboardLayout = () => {
  return (
    <Box p={"lg"}>
      <Group mb={"lg"}>
        <Link to={"admin-settings"}>admin</Link>
        <Link to={"leads"}>leads</Link>
        <Link to={"clients"}>clients</Link>
        <Link to={"orders"}>orders</Link>
        <Link to={"activities"}>activities</Link>
        <Link to={"notes"}>notes</Link>
        <ToggleColorSchemeButton />
      </Group>
      <Outlet />
    </Box>
  );
};

export default DashboardLayout;
