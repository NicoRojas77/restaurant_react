import React,{useEffect} from 'react';
import {HeadrPage} from '../../components/Admin/'
import {useAuth, useUser} from '../../hooks'



export function UsersAdmin() {
  const {auth} = useAuth();
  const {getUsers} = useUser();

  useEffect(()=> {getUsers()}, [])
   
  if(!auth.me?.is_staff)return(<div><h1>No tienes Permisos para acceder a la pagina</h1></div>)
  return (
    <>
    <HeadrPage title="Usuarios" 
    // btnTitle="Nuevo Usuario" btnTitleTwo="Eliminar Usuario"
    />
    <h1>Estamos en Users admin</h1>
    </>
  )
}
