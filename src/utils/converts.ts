export const centsToReal = (cents: Number) =>
  `R$${(Number(cents) / 100).toFixed(2).replace(".", ",")}`;

export const datetimeToDate = (dateTime: Date) => {
  const day = String(dateTime.getDate()).padStart(2, "0");
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const year = dateTime.getFullYear();
  return new Date(year + "-" + month + "-" + day);
};
