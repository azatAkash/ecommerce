import axios from "axios";
import dayjs from "dayjs";

import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router";

import Header from "../../components/Header";
import { formatCartDate } from "../../utils/date";
import "./TrackingPage.css";

const TrackingPage = ({ cart }) => {
  const { orderId, productId } = useParams();

  console.log(orderId, productId);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getTrackingsData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );

      setOrder(response.data);
    };

    getTrackingsData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = Math.abs((timePassedMs / totalDeliveryTimeMs) * 100);
  let isPreparing, isShipped, isDelivered;

  if (deliveryPercent < 33) {
    isPreparing = true;
  } else if (deliveryPercent < 100) {
    isShipped = true;
  } else {
    deliveryPercent = 100;
    isDelivered = true;
  }

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <NavLink className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </NavLink>

          <div className="delivery-date">
            {deliveryPercent < 100 ? "Arriving on " : "Delivered on "}

            {formatCartDate(orderProduct.estimatedDeliveryTimeMs)}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${
                isPreparing ? "current-status" : ""
              }`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${isShipped ? "current-status" : ""}`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${
                isDelivered ? "current-status" : ""
              }`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
