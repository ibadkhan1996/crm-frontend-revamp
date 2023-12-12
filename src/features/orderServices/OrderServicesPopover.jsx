import { Popover, Text } from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { truncate } from "lodash";

const OrderServicesPopover = ({ services = [] }) => {
  const [servicesPopoverOpened, { open: openServicesPopover, close: closeServicesPopover }] = useDisclosure(false);

  const servicesFormatted = services.reduce((pv, c, i) => (i > 0 ? pv + `, ${upperFirst(c)}` : upperFirst(c)), "");

  return (
    <Popover width={250} withArrow shadow="md" opened={servicesPopoverOpened}>
      <Popover.Target>
        <Text size="sm" onMouseEnter={openServicesPopover} onMouseLeave={closeServicesPopover}>
          {truncate(servicesFormatted, { length: 25 })}
        </Text>
      </Popover.Target>

      <Popover.Dropdown>
        <Text size="sm">{servicesFormatted}</Text>
      </Popover.Dropdown>
    </Popover>
  );
};

export default OrderServicesPopover;
