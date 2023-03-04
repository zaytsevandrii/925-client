import React, { useEffect, useReducer } from "react"
import DashboardNavbar from "../../components/DashboardNavbar"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import styles from "../../styles/Cart.module.scss"
import axios from "axios"
import Link from "next/link"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, products: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

export default function AdminProdcutsScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/admin/products`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }

        fetchData()
    }, [])
    return (
        <>
            <>
                <div className={styles.admin}>
                    <Container fluid>
                        <Row>
                            <DashboardNavbar />
                            <Col md={9} className="mt-4">
                                <h1 className="mb-4">Раздел Серебро</h1>
                                {loading ? (
                                    <div>Loading...</div>
                                ) : error ? (
                                    <div className="alert-error">{error}</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Название товара</th>
                                                    <th>Цена</th>
                                                    <th>Категория</th>
                                                    <th>Количесто</th>
                                                    <th>Действие</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product._id}>
                                                        <td>{product._id.substring(20, 24)}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price} ₸</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.countInStock}</td>
                                                        <td>
                                                            <Link href={`/admin/product/${product._id}`}>Изменить</Link>
                                                            &nbsp;
                                                            <Button variant="danger" className="mx-1">
                                                                Удалить
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        </>
    )
}

AdminProdcutsScreen.auth = { adminOnly: true }
