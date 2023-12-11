const formatCurrency = (amount = 0) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });
  return formatter.format(amount);
};

export default formatCurrency;
