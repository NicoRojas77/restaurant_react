import { BASE_API, PAYMENT_STATUS } from "../utils/constants";

export async function getPaymentsApi(){
    try {
        const paymentFilter = `estadoPago=${PAYMENT_STATUS.PAID}`
        const orderingFilter = 'ordering=creado_el'

        const url = `${BASE_API}/api/pagos/?${paymentFilter}&${orderingFilter}`
        
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}