import { Button, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Uploads = () => {
  const searchIcon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  return (
    <>
      <Button leftSection={searchIcon}>order search</Button>
    </>
  );
};

export default Uploads;
