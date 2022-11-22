import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useTable } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddEditTableForm.scss";

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table } = props;
  const { addTable, updateTable } = useTable();

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(table ? updateSchema(): newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (table) await updateTable(table.id, formValue);
      else await addTable(formValue);
      

      onRefetch();
      onClose();
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="number"
        name="numero"
        placeholder="Numero"
        value={formik.values.numero}
        onChange={formik.handleChange}
        error={formik.errors.numero}
      />

      <Button
        type="submit"
        fluid
        primary
        content={table ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  return {
    numero: data?.numero || "",
  };
}

function newSchema() {
  return {
    numero: Yup.number().required(true),
  };
}

function updateSchema() {
  return {
    numero: Yup.number().required(true),
  };
}

