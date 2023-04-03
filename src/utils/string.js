export const formatTenDigit = number => {
  return number < 10 ? `0${number}` : number;
};
