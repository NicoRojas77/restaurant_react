import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import "./ListCategories.scss";

export function ListCategories(props) {
  const { categories } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const goToCategory = (id) => {
    navigate(`${location.pathname}/${id}`);
  };
  
  return (
    <div className="list-categories">
      {map(categories, (category) => (
        <div
          key={category.id}
          className="list-categories__category"
          onClick={()=> goToCategory(category.id)}
        >
          <Image src={category.imagen} size="small" />
          <span>{category.nombre}</span>
        </div>
      ))}
    </div>
  );
}
