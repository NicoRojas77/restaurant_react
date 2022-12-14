import { useState } from "react";
import {
  createPaymentApi,
  getPaymentByTableApi,
  closePaymentApi,
  getPaymentsApi,
} from "../api/payments";

export function usePayment() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState(null);

  const getPayments = async () => {
    try {
      setLoading(true);
      const response = await getPaymentsApi();
      setLoading(false);
      setPayments(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createPayment = async (paymentData) => {
    try {
      return await createPaymentApi(paymentData);
    } catch (error) {
      setError(error);
    }
  };

  const getPaymentByTable = async (idTable) => {
    try {
      return await getPaymentByTableApi(idTable);
    } catch (error) {
      setError(error);
    }
  };

  const closePayment = async (idPayment) => {
    try {
      await closePaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };
  
  return {
    error,
    loading,
    payments,
    getPayments,
    createPayment,
    getPaymentByTable,
    closePayment,
  };
}
