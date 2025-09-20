import { formatMoney } from "../../utils/money";
import { formatCartDate } from "../../utils/date";

const DeliveryOptions = ({ deliveryOptions, cartItem }) => {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={cartItem.productId}
            />
            <div>
              <div className="delivery-option-date">
                {formatCartDate(deliveryOption.estimatedDeliveryTimeMs)}
              </div>
              <div className="delivery-option-price">
                {deliveryOption.priceCents > 0
                  ? `$${formatMoney(deliveryOption.priceCents)} -`
                  : "FREE"}{" "}
                Shipping
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryOptions;
