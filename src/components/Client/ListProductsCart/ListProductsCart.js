import React, { useState, useEffect } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder, useTable } from "../../../hooks";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import "./ListProductsCart.scss";

export function ListProductsCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder()
  const { getTableByNumber} = useTable()
  const { tableNumber } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.precio);
    });
    setTotal(totalTemp);
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder = async () =>{
    const tableData = await getTableByNumber(tableNumber)
    const idTable = tableData[0].id

    for await (const product of products){   
      await addOrderToTable(idTable, product.id)
    }
    cleanProductCartApi()
    navigate(`/client/${tableNumber}/orders`)
  }

  return (
    <div className="list-products-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-products-cart__product">
          <div>
            <Image src={product.imagen} avatar />
            <span>{product.nombre.substring(0, 20)}</span>
          </div>
          <span>${product.precio}</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}

      <Button primary fluid onClick={createOrder}>
        Realizar orden (${total})
      </Button>
    </div>
  );
}
