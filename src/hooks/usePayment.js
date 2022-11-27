import { useState } from "react";
import {
    getPaymentsApi
} from "../api/payments"

export function usePayment() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState(null);

    const getPayments = async () => {
        try {
            setLoading(true)
            const response = await getPaymentsApi()
            setLoading(false)
            setPayments(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return{
        error,
        loading,
        payments,
        getPayments,
    }
}