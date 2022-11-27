import React , {useEffect}from 'react'
import { Loader } from 'semantic-ui-react'
import { HeadrPage, TablePaymentsAdmin } from '../../components/Admin'
import { usePayment } from '../../hooks/usePayment'

export function PaymentsHistory() {
  const {loading, payments, getPayments } = usePayment()

  useEffect(()=> {getPayments()}, [])

  return (
    <>
        <HeadrPage title="Historial de pagos"/>
        {loading ? (
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ):(
          <TablePaymentsAdmin payments={payments}/>
        )}
    </>
  )
}
