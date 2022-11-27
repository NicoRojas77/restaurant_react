import { BASE_API, ORDER_STATUS } from "../utils/constants";

export async function getOrdersByTableApi(idTable, estado = "", ordenes = "") {
  try {
    const tableFilter = `mesa=${idTable}`;
    const statusFilter = `estado=${estado}`;
    const closeFilter = "close=False";

    const url = `${BASE_API}/api/ordenes/?${tableFilter}&${statusFilter}&${closeFilter}&${ordenes}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function checkDeliveredOrderApi(id) {
  try {
    const url = `${BASE_API}/api/ordenes/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: ORDER_STATUS.DELIVERED,
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersByPaymentApi(idPayment) {
  try {
    const paymentFilter = `pago=${idPayment}`

    const url = `${BASE_API}/api/ordenes/?${paymentFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
