const formatNumber = (number = 0) => {
  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 0,
  });
  return formatter.format(number);
};

export default formatNumber;
