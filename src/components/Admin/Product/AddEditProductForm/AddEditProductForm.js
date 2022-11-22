import React, { useEffect, useState, useCallback } from "react";
import {
  Form,
  Image,
  Button,
  Dropdown,
  Checkbox,
} from "semantic-ui-react";
import { useCategory, useProduct } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import "./AddEditProductForm.scss";


export function AddEditProductForm(props) {
  const { onClose,onRefetch, product} = props;
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const { categories, getCategories } = useCategory();
  const [previewImage, setPreviewImage] = useState(product ? product?.imagen :null);
  const { addProduct, updateProduct } = useProduct();


  useEffect(() => {getCategories()}, []);

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,

    onSubmit: async (formValue) => {
        if (product) await updateProduct(product.id, formValue);
        else await addProduct(formValue);

        onRefetch();
        onClose();
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
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="nombre"
        placeholder="Nombre del producto"
        value={formik.values.nombre}
        onChange={formik.handleChange}
        error={formik.errors.nombre}
      />

      <Form.Input
        type="number"
        name="precio"
        placeholder="Precio"
        value={formik.values.precio}
        onChange={formik.handleChange}
        error={formik.errors.precio}
      />

      <Dropdown
        placeholder="Categoria"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.categoria}
        error={formik.errors.categoria}
        onChange={(_, data) => formik.setFieldValue("categoria", data.value)}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.activo}
          onChange={(_, data) => formik.setFieldValue("activo", data.checked)}
        />
        Producto activo
      </div>

      <Button         
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.imagen && "red"}
        >
          {previewImage ? "Cambiar imagen" : "Subir Imagen"}
      </Button>

      <input {...getInputProps()} />
      <Image src={previewImage} />

      <Button 
      type="submit" 
      fluid
       primary
        content={product ? "Actualizar" :"Crear"}/>

    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.nombre,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    nombre: data?.nombre || "",
    precio: data?.precio || "",
    categoria: data?.categoria || "",
    activo: data?.activo ? true : false,
    imagen: "",
  };
}

function newSchema() {
  return {
    nombre: Yup.string().required(true),
    precio: Yup.number().required(true),
    categoria: Yup.number().required(true),
    activo: Yup.boolean().required(true),
    imagen: Yup.string().required(true),
  };
}

function updateSchema() {
    return {
      nombre: Yup.string().required(true),
      precio: Yup.number().required(true),
      categoria: Yup.number().required(true),
      activo: Yup.boolean().required(true),
      imagen: Yup.string(),
    };
  }
