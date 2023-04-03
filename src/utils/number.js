const moneyFormatter = Intl.NumberFormat('en-US');

export const formatMoney = moneyString => {
  return moneyFormatter.format(moneyString);
};

export const formatMoneyThousand = moneyString => {
  return formatMoney(moneyString / 1000);
};
