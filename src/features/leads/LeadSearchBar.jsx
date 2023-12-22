import { ActionIcon, Button, Group, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilterSearch, IconPlus, IconSearch } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeadSearchDrawer from "src/features/leads/LeadSearchDrawer";
import { createSearchQuery, selectLeadSearchState, setEmail } from "src/redux/slice/leadSearchSlice";

const addIcon = <IconPlus size={18} />;
const searchIcon = <IconSearch size={18} />;
const advanceSearchIcon = <IconFilterSearch size={18} />;

const LeadSearchBar = () => {
  const [drawerOpened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const leadSearchState = useSelector(selectLeadSearchState);

  const canCreateLead = true;

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(createSearchQuery());
  };

  return (
    <>
      <LeadSearchDrawer opened={drawerOpened} onClose={close} title={"search leads"} />

      <Group justify="flex-end">
        {canCreateLead && (
          <Button component={Link} to={"new"} rightSection={addIcon}>
            Add lead
          </Button>
        )}

        <form onSubmit={handleSearch} style={{ position: "relative" }}>
          <TextInput placeholder="Search lead by email" miw={250} value={leadSearchState.email || ""} onChange={(e) => dispatch(setEmail(e.target.value))} />

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

export default LeadSearchBar;
