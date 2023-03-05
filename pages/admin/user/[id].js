import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useReducer } from "react"
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import DashboardNavbar from "../../../components/DashboardNavbar"
import styles from "../../../styles/Cart.module.scss"
import { getError } from "../../../utils/error"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }

        case "UPDATE_REQUEST":
            return { ...state, loadingUpdate: true, errorUpdate: "" }
        case "UPDATE_SUCCESS":
            return { ...state, loadingUpdate: false, errorUpdate: "" }
        case "UPDATE_FAIL":
            return { ...state, loadingUpdate: false, errorUpdate: action.payload }

       
        default:
            return state
    }
}

export default function UserScreen() {
    const { query } = useRouter()
    const productId = query.id
    const [{ loading, error, loadingUpdate}, dispatch] = useReducer(reducer, {
        loading: true,
        error: "",
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/admin/users/${productId}`)
                console.log(data)
                dispatch({ type: "FETCH_SUCCESS" })
                setValue("name", data.name)
                setValue("email", data.email)
                setValue("k", data.k)
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        fetchData()
    }, [productId, setValue])

    const router = useRouter()

    const submitHandler = async ({ name, email, k}) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" })
            await axios.put(`/api/admin/users/${productId}`, {
                name,
                email,
                k,
            })
            dispatch({ type: "UPDATE_SUCCESS" })
            toast.success("Пользователь успешно обновлен")
            router.push("/admin/users")
        } catch (err) {
            dispatch({ type: "UPDATE_FAIL", payload: getError(err) })
            toast.error(getError(err))
        }
    }
    return (
        <>
            <div className={styles.admin}>
                <Container fluid>
                    <Row>
                        <DashboardNavbar />
                        <Col md={9} className="mt-4">
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div className="alert-error">{error}</div>
                            ) : (
                                <Form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                                    <h1 className="mb-4 text-xl">{`Пользователь с ID ${productId}`}</h1>
                                    <Form.Group className="mb-4" controlId="name">
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control
                                            type="text"
                                            autoFocus
                                            {...register("name", {
                                                required: "Please enter name",
                                            })}
                                        />
                                        {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="email">
                                        <Form.Label>Email ! Шифр(буквы и цифры без пробелов)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("email", {
                                                required: "Please enter email",
                                            })}
                                        />
                                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-4" controlId="k">
                                        <Form.Label>Скидка %</Form.Label>
                                        <Form.Select
                                            {...register("k", {
                                                required: "Выберите категорию",
                                            })}
                                        >
                                            <option value="1">0</option>
                                            <option value="0.9">10</option>
                                            <option value="0.8">20</option>
                                            <option value="0.7">30</option>
                                            <option value="0.6">40</option>
                                            <option value="0.5">50</option>
                                            <option value="0.45">55</option>
                                            <option value="0.4">60</option>
                                        </Form.Select>
                                        {errors.k && <div className="text-danger">{errors.k.message}</div>}
                                    </Form.Group>
                                 
                                    <Button variant="primary" disabled={loadingUpdate} type="submit">
                                        {loadingUpdate ? "Загрузка" : "Обновить"}
                                    </Button>
                                    <div className="mb-4">
                                        <Link href={`/admin/products`}>назад</Link>
                                    </div>
                                </Form>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

UserScreen.auth = { adminOnly: true }
