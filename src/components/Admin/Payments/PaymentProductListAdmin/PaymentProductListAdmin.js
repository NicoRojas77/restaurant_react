import React, { useState, useEffect } from "react";
import { map } from 'lodash'
import { Image } from "semantic-ui-react";
import { useOrder } from "../../../../hooks";
import "./PaymentProductListAdmin.scss";

export function PaymentProductListAdmin(props) {
  const { payment } = props;
  const [ orders, setOrders ] = useState([]);
  const { getOrdersByPayment } = useOrder();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response); ;
    })();
  }, []);

  return (
    <div className="payment-product-list">
        {map(orders, (order) => (
            <div className="payment-product-list__product" key={order.id}>
                <div>
                    <Image src={order.product_data.imagen} avatar size="tiny"/>
                    <span>{order.product_data.nombre}</span>
                </div>
                <span>$ {order.product_data.precio}</span>
            </div>
        ))}
    </div>
    );
}
