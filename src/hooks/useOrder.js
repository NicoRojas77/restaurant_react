import { useState } from "react";
import { getOrdersByTableApi, checkDeliveredOrderApi,getOrdersByPaymentApi, addOrderToTableApi } from "../api/orders";

export function useOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);

  const getOrdersByTable = async (idtable, estado, ordenes) => {
    try {
      setLoading(true);
      const response = await getOrdersByTableApi(idtable, estado, ordenes);
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  
  const checkDeliveredOrder = async (idOrder) => {
    try {
        await checkDeliveredOrderApi(idOrder)
    } catch (error) {
        setError(error)
    }
  }

  const getOrdersByPayment = async (idpayment) => {
    try {
      const response = await getOrdersByPaymentApi (idpayment);
      return response
    } catch (error) {
      setError(error);
    }
  };

  const addOrderToTable = async (idTable, idProduct) => {
    try {
      await addOrderToTableApi(idTable, idProduct);
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    getOrdersByPayment,
    addOrderToTable,
  };
}
