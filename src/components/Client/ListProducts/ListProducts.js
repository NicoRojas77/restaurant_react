import React from "react";
import { Button, Image, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductCart } from "../../../api/cart";
import "./ListProducts.scss";

export function ListProducts(props) {
  const { products } = props;

  const addCart = (product) => {
    addProductCart(product.id);
    toast.success(`${product.nombre} agregado al carrito`);
  };

  return (
    <div className="list-products">
      {map(products, (product) => (
        <div key={product.id} className="list-products__product">
          <div>
            <Image src={product.imagen} avatar />
            <span>{product.nombre}</span>
          </div>
          <Button primary icon onClick={() => addCart(product)}>
            <span>$ {product.precio} </span>
          </Button>
        </div>
      ))}
    </div>
  );
}
