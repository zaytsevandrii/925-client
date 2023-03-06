import axios from "axios"
import Link from "next/link"
import React, { useEffect, useReducer } from "react"
import { getError } from "../../utils/error"
import { Container, Row, Col, Table, Button  } from "react-bootstrap"
import { useRouter } from "next/router"
import DashboardNavbar from "../../components/DashboardNavbar"
import styles from "../../styles/Cart.module.scss"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, orders: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

export default function AdminOrderScreen() {
    const router = useRouter()
    const isActive = (pathname) => router.pathname === pathname

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/admin/orders`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        fetchData()
    }, [])

    return (
        <>
          <div className={styles.admin}>
          <Container fluid>
                <Row>
                    <DashboardNavbar />
                    <Col md={9} className="mt-4">
                        <h1 className="mb-4">Просмотр заказов</h1>
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="alert-error">{error}</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Пользователь</th>
                                            <th>Дата</th>
                                            <th>Сумма</th>
                                            <th>Действие</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id.substring(20, 24)}</td>
                                                <td>{order.user ? order.user.name : "DELETED USER"}</td>
                                                <td>{order.createdAt.substring(0, 10)}, {order.createdAt.substring(11, 16)}</td>
                                                <td>{order.itemsPrice}</td>

                                                <td>
                                                    <Link href={`/order2/${order._id}`}>Детали</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
          </div>
        </>
    )
}

AdminOrderScreen.auth = { adminOnly: true }
