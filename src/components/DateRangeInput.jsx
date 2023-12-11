import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import formatDateUTC from "src/utils/formatDateUTC";

const DateRangeInput = ({ range = {}, setRange = () => {}, ...props }) => {
  const selectedDateRange = () => {
    if (!!Object.keys(range).length) {
      const { startDate, endDate } = range;

      const _startDate = new Date(new Date(startDate).getTime() + new Date(startDate).getTimezoneOffset() * 60000);
      const _endDate = new Date(new Date(endDate).getTime() + new Date(endDate).getTimezoneOffset() * 60000);

      return [_startDate, _endDate];
    }

    return [];
  };

  const [dateRange, setDateRange] = useState(selectedDateRange());

  useEffect(() => {
    const startDate = dateRange[0] instanceof Date ? formatDateUTC(dateRange[0]) : null;
    const endDate = dateRange[1] instanceof Date ? formatDateUTC(dateRange[1]).replace("T00:00:00", "T23:59:59") : null;

    if (!!startDate && !!endDate) {
      setRange({ startDate, endDate });
    }
  }, [dateRange]);

  useEffect(() => {
    if (!Object.keys(range).length) {
      setDateRange([]);
    }
  }, [setRange]);

  return <DatePickerInput type="range" value={dateRange} onChange={setDateRange} {...props} />;
};

export default DateRangeInput;
