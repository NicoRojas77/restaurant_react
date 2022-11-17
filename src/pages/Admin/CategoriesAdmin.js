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
  

  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, categories, getCategories } = useCategory();

  useEffect(() => getCategories(), [refetch]);

  const OpenCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddEditCategoryForm onClose={OpenCloseModal} onRefetch={onRefetch} />
    );
    OpenCloseModal();
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
        <TableCategoryAdmin categories={categories} />
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
