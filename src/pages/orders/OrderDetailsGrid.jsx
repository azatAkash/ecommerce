import { formatOrderDate } from "../../utils/date";
import { Fragment } from "react";
import { NavLink } from "react-router";

import BuyAgainIcon from "../../assets/images/icons/buy-again.png";

const OrderDetailsGrid = ({ order }) => {
  return (
    <div className="order-details-grid">
      {order.products.map((ordersProduct) => {
        return (
          <Fragment key={ordersProduct.product.id}>
            <div className="product-image-container">
              <img src={ordersProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{ordersProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {formatOrderDate(ordersProduct.estimatedDeliveryTimeMs)}
              </div>
              <div className="product-quantity">
                Quantity: {ordersProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={BuyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <NavLink to={`/tracking/${order.id}/${ordersProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </NavLink>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderDetailsGrid;
