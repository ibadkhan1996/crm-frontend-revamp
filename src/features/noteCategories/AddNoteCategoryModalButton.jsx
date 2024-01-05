import { Button, Stack, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFolderFilled } from "@tabler/icons-react";
import AddNoteCategoryModal from "./AddNoteCategoryModal";

const AddNoteCategoryModalButton = () => {
  const [addNoteCategoryModalOpened, { open: openAddNoteCategoryModal, close: closeAddNoteCategoryModal }] = useDisclosure(false);

  return (
    <>
      <AddNoteCategoryModal isOpen={addNoteCategoryModalOpened} onClose={closeAddNoteCategoryModal} />

      <Button fullWidth variant="light" h={"auto"} p={"md"} mih={"100%"} onClick={openAddNoteCategoryModal}>
        <Stack align="center">
          <ThemeIcon size={"xl"}>
            <IconFolderFilled size={"85%"} />
          </ThemeIcon>

          <Text size="sm" fw={600}>
            Add note category
          </Text>
        </Stack>
      </Button>
    </>
  );
};

export default AddNoteCategoryModalButton;
