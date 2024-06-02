export function generateOrderId() {
  const prefix = "BD";
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}${randomNumber}`;
}
