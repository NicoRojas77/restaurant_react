import { BASE_API } from "../utils/constants";

export async function getProductsApi() {
  try {
    const url = `${BASE_API}/api/productos/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addProductApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("precio", data.precio);
    formData.append("categoria", data.categoria);
    formData.append("activo", data.activo);
    formData.append("imagen", data.imagen);

    const url = `${BASE_API}/api/productos/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateProductApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("precio", data.precio);
    formData.append("categoria", data.categoria);
    formData.append("activo", data.activo);
    if (data.imagen) formData.append("imagen", data.imagen);

    const url = `${BASE_API}/api/productos/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductByIdApi(id) {
  try {
    const url = `${BASE_API}/api/productos/${id}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductApi(id, token) {
  try {
    const url = `${BASE_API}/api/productos/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByCategoryApi(idCategory){
  try {
      const categoryFilter = `categoria=${idCategory}`
      const url = `${BASE_API}/api/productos/?${categoryFilter}`
      const response = await fetch(url)
      const result = await response.json()
      return result
  } catch (error) {
    throw error
  }
}
