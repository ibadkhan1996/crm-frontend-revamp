import { ActionIcon, Button, Group, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilterSearch, IconPlus, IconSearch } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClientSearchDrawer from "src/features/clients/ClientSearchDrawer";
import { createSearchQuery, selectClientSearchState, setClientEmail } from "src/redux/slice/clientSearchSlice";

const addIcon = <IconPlus size={18} />;
const searchIcon = <IconSearch size={18} />;
const advanceSearchIcon = <IconFilterSearch size={18} />;

const ClientSearchBar = () => {
  const [drawerOpened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const clientSearchState = useSelector(selectClientSearchState);

  const canCreateClient = true;

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(createSearchQuery());
  };

  return (
    <>
      <ClientSearchDrawer opened={drawerOpened} onClose={close} title={"search clients"} />

      <Group justify="flex-end">
        {canCreateClient && (
          <Button component={Link} to={"new"} rightSection={addIcon}>
            Add client
          </Button>
        )}

        <form onSubmit={handleSearch} style={{ position: "relative" }}>
          <TextInput placeholder="Search client by email" miw={250} value={clientSearchState.email || ""} onChange={(e) => dispatch(setClientEmail(e.target.value))} />

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

export default ClientSearchBar;
