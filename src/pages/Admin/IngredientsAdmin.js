import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { HeadrPage, TableIngredientAdmin, AddEditIngredientForm } from "../../components/Admin";
import { useIngredient } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export function IngredientsAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const [refetch, setRefetch] = useState(false);
  const { loading, ingredients, getIngredients, deleteIngredient } = useIngredient();

  useEffect(() => {
    getIngredients();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addIngredient = () => {
    setTitleModal("Nuevo Ingrediente");
    setContentModal(
      <AddEditIngredientForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateIngredient = (data) => {
    setTitleModal("Actualizar Ingrediente");
    setContentModal(
      <AddEditIngredientForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        ingredient={data}
      />
    );
    openCloseModal();
  };

  const onDeleteIngredient = async (data) => {
    const result = window.confirm(`¿Quieres eliminar el Ingrediente ${data.nombre}?`);
    if (result) {
      await deleteIngredient(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeadrPage title="Ingredientes" btnTitle="Nuevo Ingrediente" btnClick={addIngredient} />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableIngredientAdmin ingredients={ingredients} updateIngredient={updateIngredient} deleteIngredient={onDeleteIngredient}/>
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
