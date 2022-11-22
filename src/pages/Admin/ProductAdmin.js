import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeadrPage,
  TableProductAdmin,
  AddEditProductForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useProduct } from "../../hooks/useProduct";

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const [refetch, setRefetch] = useState(false);
  const { loading, products, getProducts, deleteProduct } = useProduct();

  useEffect(() => {getProducts()}, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo Producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal("Actualizar Producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (data) => {
    const result = window.confirm(
      `¿Quieres eliminar el producto ${data.nombre}?`
    );
    if (result) {
      await deleteProduct(data.id);
      onRefetch();
    }
  };
  return (
    <>
      <HeadrPage
        title="Productos"
        btnTitle="Nuevo Producto"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProductAdmin
          products={products}
          updateProduct={updateProduct}
          deleteProduct={onDeleteProduct}
        />
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
