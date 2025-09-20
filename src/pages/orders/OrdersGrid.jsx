import OrderHeader from "./OrderHeader";
import OrderDetailsGrid from "./OrderDetailsGrid";

const OrdersGrid = ({ orders }) => {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div className="order-container" key={order.id}>
            <OrderHeader order={order} />

            <OrderDetailsGrid order={order} />
          </div>
        );
      })}
    </div>
  );
};

export default OrdersGrid;
