import React, { useEffect, useReducer } from "react"
import DashboardNavbar from "../../components/DashboardNavbar"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import styles from "../../styles/Cart.module.scss"
import axios from "axios"
import Link from "next/link"
import { toast } from "react-toastify"
import { getError } from "../../utils/error"
import { useRouter } from "next/router"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, products: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        case "CREATE_REQUEST":
            return { ...state, loadingCreate: true }
        case "CREATE_SUCCESS":
            return { ...state, loadingCreate: false }
        case "CREATE_FAIL":
            return { ...state, loadingCreate: false }
        case "DELETE_REQUEST":
            return { ...state, loadingDelete: true }
        case "DELETE_SUCCESS":
            return { ...state, loadingDelete: false, successDelete: true }
        case "DELETE_FAIL":
            return { ...state, loadingDelete: false }
        case "DELETE_RESET":
            return { ...state, loadingDelete: false, successDelete: false }
        default:
            state
    }
}

export default function AdminScarvesScreen() {
    const router = useRouter()
    const [{ loading, error, products, loadingCreate, successDelete, loadingDelete }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: "",
    })

    const createHandler = async () => {
       
        try {
            dispatch({ type: "CREATE_REQUEST" })
            const { data } = await axios.post(`/api/admin/products`)
            dispatch({ type: "CREATE_SUCCESS" })
            toast.success("Товар успешно создан")
            router.push(`/admin/product/${data.product._id}`)
        } catch (err) {
            dispatch({ type: "CREATE_FAIL" })
            toast.error(getError(err))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/admin/scarves`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        if (successDelete) {
            dispatch({ type: "DELETE_RESET" })
        } else {
            fetchData()
        }
    }, [successDelete])

    const deleteHandler = async (productId) => {
        if (!window.confirm('Вы уверены?')) {
          return;
        }
        try {
          dispatch({ type: 'DELETE_REQUEST' });
          await axios.delete(`/api/admin/products/${productId}`);
          dispatch({ type: 'DELETE_SUCCESS' });
          toast.success('Товар успешно удален');
        } catch (err) {
          dispatch({ type: 'DELETE_FAIL' });
          toast.error(getError(err));
        }
      };

    return (
        <>
            <>
                <div className={styles.admin}>
                    <Container fluid>
                        <Row>
                            <DashboardNavbar />
                            <Col md={9} className="mt-4">
                                <div>
                                    <h1 className="">Бижутерия</h1>
                                    {loadingDelete && <div>Удаление товара..</div>}
                                    <Button
                                        className="mx-3 my-3"
                                        disabled={loadingCreate}
                                        onClick={createHandler}
                                        variant="primary"
                                    >
                                        {loadingCreate ? "Загрузка" : "Создать"}
                                    </Button>
                                </div>
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
                                                    <th>Slug</th>
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
                                                        <td>{product.slug}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price} ₸</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.countInStock}</td>
                                                        <td>
                                                            <Link href={`/admin/product/${product._id}`}>Изменить</Link>
                                                            &nbsp;
                                                            <Button variant="danger" className="mx-1" onClick={() => deleteHandler(product._id)}>
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

AdminScarvesScreen.auth = { adminOnly: true }
