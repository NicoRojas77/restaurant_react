import { BASE_API } from "../utils/constants";

export async function getCategoriesApi() {
  try {
    const url = `${BASE_API}/api/categorias/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addCategoryApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("imagen", data.imagen);
    formData.append("nombre", data.nombre);

    const url = `${BASE_API}/api/categorias/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (error) {
    throw error;
  }
}