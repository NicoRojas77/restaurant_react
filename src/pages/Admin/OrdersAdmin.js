import React, { useEffect } from "react";
import { HeadrPage, TablesListAdmin } from "../../components/Admin";
import { Loader } from "semantic-ui-react";
import { useTable } from "../../hooks";

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => {getTables()}, []);


  return (
    <>
      <HeadrPage title="Restaurante" />
      {loading ? (
        <Loader active inline="centered">
          Cargando ...
        </Loader>
      ) : (
        <TablesListAdmin tables={tables}/>
      )}
    </>
  );
}
