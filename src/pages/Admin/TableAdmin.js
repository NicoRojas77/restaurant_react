import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeadrPage,
  TableTablesAdmin,
  AddEditTableForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useTable } from "../../hooks";

export function TableAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, tables, getTables, deleteTable } = useTable();

  useEffect(() => {
    getTables();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addTable = () => {
    setTitleModal("Nueva Mesa");
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateTable = (data) => {
    setTitleModal("Actualizar Mesa");
    setContentModal(
      <AddEditTableForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        table={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTable = async (data) => {
    const result = window.confirm(`¿Quieres eliminar la mesa ${data.numero}?`);
    if (result) {
      await deleteTable(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeadrPage
        title="Mesas"
        btnTitle="Crear Nueva Mesa"
        btnClick={addTable}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableTablesAdmin
          tables={tables}
          updateTable={updateTable}
          deleteTable={onDeleteTable}
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
