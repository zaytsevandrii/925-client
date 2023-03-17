import React, { useEffect, useReducer } from "react"
import { getError } from "../utils/error"
import { Container, Table } from "react-bootstrap"
import Link from "next/link"
import styles from "../styles/Cart.module.scss"
import axios from "axios"
import Meta from "../components/Meta"

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

function OrderHistoryScreen() {
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
        <><Meta title='История заказов'/>
            <div className={styles.orderHistory}>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center  justify-content-center">
                            <h1>История заказов</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 mt-2">
                            {loading ? (
                                <div>Загрузка...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
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
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <th scope="row">{order._id.substring(20, 24)}</th>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.itemsPrice}</td>
                                                <td>
                                                    <Link  href={`/order/${order._id}`}>детали</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
