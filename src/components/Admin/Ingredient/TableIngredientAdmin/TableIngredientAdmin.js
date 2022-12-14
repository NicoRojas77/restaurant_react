import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableIngredientAdmin.scss";

export function TableIngredientAdmin(props) {
  const { ingredients, updateIngredient, deleteIngredient } = props;

  return (
    <Table className="table-ingredient">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Opciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(ingredients, (ingredient, index) => (
          <Table.Row key={index}>
            <Table.Cell>{ingredient.nombre}</Table.Cell>
            <Table.Cell>
              {ingredient.activo ? (
                <Icon name="check" color="green" />
              ) : (
                <Icon name="close" color="red" />
              )}
            </Table.Cell>
            <Actions ingredient={ingredient} updateIngredient={updateIngredient} deleteIngredient={deleteIngredient}/>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props){
    const { ingredient, updateIngredient, deleteIngredient } = props

    return(
        <Table.Cell textAlign="right">
            <Button icon onClick={() => updateIngredient(ingredient)}>
                <Icon name="pencil"/>
            </Button>
            <Button icon negative onClick={() => deleteIngredient(ingredient)}>
                <Icon name="delete"/>
            </Button>
        </Table.Cell>
    )
}
