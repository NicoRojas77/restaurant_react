import React, { useEffect, useState, useCallback } from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useIngredient } from "../../../../hooks";

export function AddEditIngredientForm(props) {
  const { onClose, onRefetch, ingredient } = props;

  const { addIngredient, updateIngredient} = useIngredient();


  const formik = useFormik({
    initialValues: initialValues(ingredient),
    validationSchema: Yup.object(ingredient ? updateSchema() : newSchema()),
    validateOnChange: false,

    onSubmit: async (formValue) => {
      if (ingredient) await updateIngredient(ingredient.id, formValue);
      else await addIngredient(formValue);

      onRefetch();
      onClose();
    },
  });

  return (
    <Form className="add-edit-ingredient" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="nombre"
        type="text"
        placeholder="Nombre Ingrediente"
        value={formik.values.nombre}
        onChange={formik.handleChange}
        error={formik.errors.nombre}
      />
      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.activo}
          onChange={(_, data) => formik.setFieldValue("activo", data.checked)}
        />
        Ingrediente activo
      </div>
      <Button type="submit" primary fluid content={ingredient ? "Actualizar" : "Agregar Ingrediente"} />
    </Form>
  );
}

function initialValues(data) {
  return {
    nombre: data?.nombre || "",
    activo: data?.activo ? true : false,
  };
}

function newSchema() {
  return {
    nombre: Yup.string().required(true),
    activo: Yup.boolean().required(true),
  };
}

function updateSchema() {
  return {
    nombre: Yup.string().required(true),
    activo: Yup.boolean().required(true),
  };
}
