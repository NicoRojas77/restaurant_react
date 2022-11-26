import React, {useState,useEffect} from 'react'
import { Loader } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { HeadrPage } from '../../components/Admin'
import { ListOrderAdmin } from '../../components/Admin/TableDetails'
import { useOrder, useTable } from '../../hooks'

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false)
  const { id } = useParams()
  const { loading, orders, getOrdersByTable} = useOrder()
  const {table, getTable} = useTable()

 console.log(table);

  useEffect(() => {getOrdersByTable(id, "", "ordering=-estado,creado_el")}, [id, reloadOrders])

  useEffect(()=> {getTable(id)},[id])

  const onReloadOrders = () => {setReloadOrders((prev) => !prev)}
  
  
  return (
    <>
    <HeadrPage title={`Mesa ${table?.numero}`}/>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ):( <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders}/>)}

    </>
  )
}

