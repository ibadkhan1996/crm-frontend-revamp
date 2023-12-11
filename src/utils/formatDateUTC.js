import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// const formatDateUTC = (startDate, endDate) => {
//   const startDateUTC = startDate instanceof Date ? dayjs(startDate).utc(true).format() : null;
//   const endDateUTC = endDate instanceof Date ? dayjs(endDate).utc(true).format().replace("T00:00:00", "T23:59:59") : null;

//   return { startDateUTC, endDateUTC };
// };

const formatDateUTC = (date) => {
  return date instanceof Date ? dayjs(date).utc(true).format() : null;
};

export default formatDateUTC;
