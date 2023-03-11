import React, { useEffect, useReducer } from "react"
import styles from "../../styles/Cart.module.scss"
import { Container, Row, Col, Card } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { getError } from "../../utils/error"
import axios from "axios"
import DashboardNavbar from "../../components/DashboardNavbar"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, summary: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

function AdminDashboardScreen() {
    const router = useRouter()

    const isActive = (pathname) => router.pathname === pathname
    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: true,
        summary: { salesData: [] },
        error: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/admin/summary`)
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
                        {/* <Col md={2} className="mt-4">
                        <ul className="list-group">
                            <li className={`list-group-item ${isActive("/admin/dashboard") ? "active" : ""}`}>
                                <Link href="/admin/dashboard" style={{ color: "inherit" }}>
                                    Администрирование
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/orders") ? "active" : ""}`}>
                                <Link href="/admin/orders" style={{ color: "inherit" }}>
                                    Заказы
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/users") ? "active" : ""}`}>
                                <Link href="/admin/users" style={{ color: "inherit" }}>
                                    Пользователи
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/products") ? "active" : ""}`}>
                                <Link href="/admin/products" style={{ color: "inherit" }}>
                                    Продукты
                                </Link>
                            </li>
                        </ul>
                    </Col> */}
                        <DashboardNavbar />
                        <Col md={9} className="mt-4">
                            <h2 className="mb-4 text-xl">Администрирование!</h2>
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div className="alert-error">{error}</div>
                            ) : (
                                <div>
                                    <Row className="g-4">
                                        <Col md={3}>
                                            <Card className="m-2 p-1">
                                                <Card.Title as="h2" className="text-3xl">
                                                    {summary.ordersPrice}
                                                </Card.Title>
                                                <Card.Text>Продажи</Card.Text>
                                                <Link href="/admin/orders">Прсомотреть заказы</Link>
                                            </Card>
                                        </Col>
                                        <Col md={3}>
                                            <Card className="m-2 p-1">
                                                <Card.Title as="h2" className="text-3xl">
                                                    {summary.ordersCount}
                                                </Card.Title>
                                                <Card.Text>Заказы</Card.Text>
                                                <Link href="/admin/orders">Прсомотреть заказы</Link>
                                            </Card>
                                        </Col>

                                        <Col md={3}>
                                            <Card className="m-2 p-1">
                                                <Card.Title as="h2" className="text-3xl">
                                                    {summary.usersCount}
                                                </Card.Title>
                                                <Card.Text>Пользователей</Card.Text>
                                                <Link href="/admin/users">Посмотреть</Link>
                                            </Card>
                                        </Col>
                                        <Col md={3}>
                                            <Card className="m-2 p-1">
                                                <Card.Title as="h2" className="text-3xl">
                                                    {summary.productsCount}
                                                </Card.Title>
                                                <Card.Text>Всего товаров</Card.Text>
                                                {/* <Link href="/admin/products">Посмотреть раздел</Link> */}
                                            </Card>
                                        </Col>
                                       {/*  <Col md={3}>
                                            <Card className="m-2 p-1">
                                                <Card.Title as="h2" className="text-3xl">
                                                    {summary.productsCount}
                                                </Card.Title>
                                                <Card.Text>Товаров Серебра</Card.Text>
                                                <Link href="/admin/products">Посмотреть раздел</Link>
                                            </Card>
                                        </Col>
                                        <Col md={3}>
                                            <Card className="m-2 p-1">
                                                <Card.Title as="h2" className="text-3xl">
                                                    {summary.productsCount}
                                                </Card.Title>
                                                <Card.Text>Товаров Серебра</Card.Text>
                                                <Link href="/admin/products">Посмотреть раздел</Link>
                                            </Card>
                                        </Col> */}
                                    </Row>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

AdminDashboardScreen.auth = { adminOnly: true }

export default AdminDashboardScreen
