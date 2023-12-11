import { ActionIcon, Button, Group, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilterSearch, IconPlus, IconSearch } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderSearchDrawer from "src/features/orders/OrderSearchDrawer";
import { createSearchQuery, selectOrderSearchState, setClientEmail } from "src/redux/slice/orderSearchSlice";

const addIcon = <IconPlus size={18} />;
const searchIcon = <IconSearch size={18} />;
const advanceSearchIcon = <IconFilterSearch size={18} />;

const OrderSearchBar = () => {
  const [drawerOpened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const orderSearchState = useSelector(selectOrderSearchState);

  const canCreateOrder = true;

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(createSearchQuery());
  };

  return (
    <>
      <OrderSearchDrawer opened={drawerOpened} onClose={close} title={"search orders"} />

      <Group justify="flex-end">
        {canCreateOrder && (
          <Button component={Link} to={"new"} rightSection={addIcon}>
            Add order
          </Button>
        )}

        <form onSubmit={handleSearch} style={{ position: "relative" }}>
          <TextInput placeholder="Search order by client email" miw={250} value={orderSearchState.email || ""} onChange={(e) => dispatch(setClientEmail(e.target.value))} />

          <ActionIcon type="submit" style={{ position: "absolute", top: 4, right: 4 }}>
            {searchIcon}
          </ActionIcon>
        </form>

        <Button leftSection={advanceSearchIcon} onClick={open}>
          Advanced search
        </Button>
      </Group>
    </>
  );
};

export default OrderSearchBar;
