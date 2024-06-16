export const formatNumber = (number: number): string => {
  return Intl.NumberFormat().format(number);
};
