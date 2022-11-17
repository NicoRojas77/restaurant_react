import React, { useState, useCallback } from "react";
import "./AddEditCategoryForm.scss";
import { Form, Image, Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../../../hooks";

export function AddEditCategoryForm(props) {
  const { onClose, onRefetch } = props;
  const [previewImage, setPreviewImage] = useState(null);
  const { addCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await addCategory(formValue);
        onRefetch();
        onClose();

      } catch (error) {

      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("imagen", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "imagen/jpeg, imagen/png, imagen/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="nombre"
        placeholder="Nombre de la Categoria"
        value={formik.values.nombre}
        onChange={formik.handleChange}
        error={formik.errors.nombre}
      />
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.imagen && "red"}
      >
        Subir imagen
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} fluid />

      <Button type="submit" primary fluid content="Crear" />
    </Form>
  );
}

function initialValues() {
  return {
    nombre: "",
    imagen: "",
  };
}
function newSchema() {
  return {
    nombre: Yup.string().required(true),
    imagen: Yup.string().required(true),
  };
}
