import { formatCartDate } from "../../utils/date";

const DeliveryDate = ({ deliveryOptions, cartItem }) => {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {formatCartDate(selectedDeliveryOption.estimatedDeliveryTimeMs)}
    </div>
  );
};

export default DeliveryDate;
