import { useState } from "react";
import { addIngredientApi, getIngredientsApi, updateIngredientApi, deleteIngredientApi } from "../api/ingredients";
import { useAuth } from "./";

export function useIngredient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  const { auth } = useAuth();

  const getIngredients = async () => {
    try {
      setLoading(true);
      const response = await getIngredientsApi(auth.token);
      setLoading(false);
      setIngredients(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addIngredient = async (data) => {
    try {
      setLoading(true);
      await addIngredientApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateIngredient = async (id, data) => {
    try {
      setLoading(true);
      await updateIngredientApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      setLoading(true);
      await deleteIngredientApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    ingredients,
    getIngredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
  };
}
