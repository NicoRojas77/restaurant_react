import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditCategoryForm,
  HeadrPage,
  TableCategoryAdmin,
} from "../../components/Admin";
import { useCategory } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => {
    getCategories();
  }, [refetch]);

  const OpenCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddEditCategoryForm onClose={OpenCloseModal} onRefetch={onRefetch} />
    );
    OpenCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar Categoria");
    setContentModal(
      <AddEditCategoryForm
        onClose={OpenCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    OpenCloseModal();
  };

  const onDeleteCategory =  async (data) => {
    const result = window.confirm(
      `¿Quieres eliminar la categoria ${data.nombre}?`
    );
    if (result) {
     await deleteCategory(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeadrPage
        title="Categorias"
        btnTitle="Nueva categoria"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
          deleteCategory={onDeleteCategory}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={OpenCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
