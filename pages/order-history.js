import React, { useEffect, useReducer } from "react"
import { getError } from "../utils/error"
import { Container, Table } from "react-bootstrap"
import Link from "next/link"
import styles from "../styles/Cart.module.scss"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, orders: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default function OrderHistoryScreen() {
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: "",
    })

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/orders/history`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        fetchOrders()
    }, [])
    return (
        <>
        <div className={styles.orderHistory}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 d-flex align-items-center  justify-content-center">
                        <h1>Разместить заказ</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-2">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID Заказа</th>
                                    <th scope="col">Дата</th>
                                    <th scope="col">Сумма</th>
                                    <th scope="col">Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>
                                        <Link href="/">детали</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
