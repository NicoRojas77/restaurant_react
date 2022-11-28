import { BASE_API } from "../utils/constants";

export async function getTablesApi() {
  try {
    const url = `${BASE_API}/api/mesas/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addTableApi(data, token) {
  try {
    const url = `${BASE_API}/api/mesas/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateTableApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/mesas/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteTableApi(id,  token) {
  try {
    const url = `${BASE_API}/api/mesas/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTableApi(idTable) {
  try {
    const url = `${BASE_API}/api/mesas/${idTable}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTableByNumberApi(numberTable) {
  try {
    const tableFilter = `numero=${numberTable}`

    const url = `${BASE_API}/api/mesas/?${tableFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}