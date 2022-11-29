import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { size, forEach } from "lodash";
import { ModalBasic } from "../../components/Common";
import { HeadrPage, AddOrderForm } from "../../components/Admin";
import { ListOrderAdmin, PaymentDetail } from "../../components/Admin/TableDetails";
import { useOrder, useTable, usePayment } from "../../hooks";

export function TableDetailsAdmin() {
  const [ reloadOrders, setReloadOrders ] = useState(false);
  const [ paymentData, setPaymentData ] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder  } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-estado,creado_el");
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]);

  const onReloadOrders = () => {
    setReloadOrders((prev) => !prev);
  };

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm(
      "¿Estas seguro de generar la cuenta de la mesa?"
    );

    if (result) {
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.precio);
      });

      const resultTypePayment = window.confirm(
        "¿Pago con tarjeta pulsa ACEPTAR con efectivo pulsa CANCELAR"
      );

      const paymentData = {
        mesa: id,
        totalPago: totalPayment,
        tipoPago: resultTypePayment ? "TARJETA" : "EFECTIVO",
        estadoPago: "PENDIENTE",
      };

      

      const payment = await createPayment(paymentData);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();
    }
  };


  return (
    <>
      <HeadrPage
        title={`Mesa ${table?.numero || ""}`}
        btnTitle={paymentData ? "Ver cuenta" : null}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Generar pedido"
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}