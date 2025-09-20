import dayjs from "dayjs";

export function formatCartDate(estimatedDeliveryTimeMs) {
  return dayjs(estimatedDeliveryTimeMs).format("dddd, MMMM, D");
}

export function formatOrderDate(estimatedDeliveryTimeMs) {
  return dayjs(estimatedDeliveryTimeMs).format("MMMM D");
}
