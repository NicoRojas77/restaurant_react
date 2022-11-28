import React from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";
import "./OrderHistoryItem.scss";

export function OrderHistoryItem(props) {
  const { order } = props;
  const { nombre, imagen } = order.product_data;

  return (
    <div
      className={classNames("order-history-item", {
        [order.estado.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.creado_el).startOf("second").fromNow()}
        </span>
      </div>

      <div className="order-history-item__product">
        <Image src={imagen} />
        <p>{nombre}</p>
      </div>

      {order.estado === ORDER_STATUS.PENDING ? (
        <span>En Preparación</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  );
}
