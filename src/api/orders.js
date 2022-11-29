import { BASE_API, ORDER_STATUS } from "../utils/constants";

export async function getOrdersByTableApi(idTable, estado = "", ordenes = "") {
  try {
    const tableFilter = `mesa=${idTable}`;
    const statusFilter = `estado=${estado}`;
    const closeFilter = "cerrado=False";

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

export async function addOrderToTableApi(idTable, idProduct) {
  try {
    const url = `${BASE_API}/api/ordenes/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: ORDER_STATUS.PENDING,
        mesa: idTable,
        producto: idProduct,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}

export async function addPaymentToOrderApi(idOrder, idPayment) {
  try {
    const url = `${BASE_API}/api/ordenes/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pago: idPayment,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}

export async function closeOrderApi(idOrder) {
  try {
    const url = `${BASE_API}/api/ordenes/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cerrado: true,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}
