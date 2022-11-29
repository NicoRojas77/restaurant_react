import React from "react";
import { Button, Image, Label } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import { useOrder } from "../../../../hooks";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../../utils/constants";
import "./OrderItemAdmin.scss";

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { nombre, imagen } = order.product_data;
  const { checkDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrders()
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.estado.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.creado_el).format("hh:mm")}</span>
        <span> // {moment(order.creado_el).startOf("seconds").fromNow()}</span>
      </div>
      <div className="order-item-admin__product">
        <Image src={imagen} />
        <p>{nombre}</p>
      </div>

      {order.estado == ORDER_STATUS.PENDING && (
        <Button primary onClick={onCheckDeliveredOrder}>
          Marcar como entregado
        </Button>
      ) }
    </div>
  );
}
