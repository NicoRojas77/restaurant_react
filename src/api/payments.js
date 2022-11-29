import { BASE_API, PAYMENT_STATUS } from "../utils/constants";

export async function getPaymentsApi(){
    try {
        const paymentFilter = `estadoPago=${PAYMENT_STATUS.PAID}`
        const orderingFilter = 'ordering=creado_el'

        const url = `${BASE_API}/api/pagos/?${paymentFilter}&${orderingFilter}`
        
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

export async function createPaymentApi(paymentData) {
    try {
      const url = `${BASE_API}/api/pagos/`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function getPaymentByTableApi(idTable) {
    try {
      const tableFilter = `mesa=${idTable}`;
      const statusFilter = `estadoPago=${PAYMENT_STATUS.PENDING}`;
  
      const url = `${BASE_API}/api/pagos/?${tableFilter}&${statusFilter}`;
      const params = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function closePaymentApi(idPayment) {
    try {
      const url = `${BASE_API}/api/pagos/${idPayment}/`;
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estadoPago: PAYMENT_STATUS.PAID,
        }),
      };
      await fetch(url, params);
    } catch (error) {
      throw error;
    }
  }