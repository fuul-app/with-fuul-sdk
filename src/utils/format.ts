export const formatDecimalAmount = (amount: number): string => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  });
};
