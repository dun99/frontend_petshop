export const formatMoney = (value) => {
  const newMoney = value.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return newMoney;
};
