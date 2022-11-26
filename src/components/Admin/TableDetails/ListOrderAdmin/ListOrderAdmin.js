import React from "react";
import { map } from "lodash";
import "./ListOrderAdmin";
import { OrderItemAdmin } from "../OrderItemAdmin/OrderItemAdmin";

export function ListOrderAdmin(props) {
  const { orders, onReloadOrders } = props;

  return (
    <div className="list-orders-admin">
      {map(orders, (order) => (
        <OrderItemAdmin
          key={order.id}
          order={order}
          onReloadOrders={onReloadOrders}
        />
      ))}
    </div>
  );
}
