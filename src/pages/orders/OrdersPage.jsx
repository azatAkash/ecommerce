import axios from "axios";

import { useState, useEffect, Fragment } from "react";

import Header from "../../components/Header";
import { NavLink } from "react-router";

import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import "./OrdersPage.css";
import { formatOrderDate } from "../../utils/date";
import { formatMoney } from "../../utils/money";

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async () => {
      const response = await axios.get("api/orders?expand=products");
      setOrders(response.data);
    };

    getOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div className="order-container" key={order.id}>
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{formatOrderDate(order.orderTimeMs)}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((ordersProduct) => {
                    return (
                      <Fragment key={ordersProduct.product.id}>
                        <div className="product-image-container">
                          <img src={ordersProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {ordersProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {formatOrderDate(
                              ordersProduct.estimatedDeliveryTimeMs
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {ordersProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src={BuyAgainIcon}
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <NavLink to="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </NavLink>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
