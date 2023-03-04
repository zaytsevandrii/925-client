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
        default:
            return state
    }
}

export default function AdminProductEditScreen() {
    const { query } = useRouter()
    const productId = query.id
    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
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
                const { data } = await axios.get(`/api/admin/products/${productId}`)
                dispatch({ type: "FETCH_SUCCESS" })
                setValue("name", data.name)
                setValue("slug", data.slug)
                setValue("price", data.price)
                setValue("image", data.image)
                setValue("category", data.category)
                setValue("countInStock", data.countInStock)
                setValue("description", data.description)
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }

        fetchData()
    }, [productId, setValue])

    const router = useRouter();

    const submitHandler = async ({ name, slug, price, category, image, countInStock, description }) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" })
            await axios.put(`/api/admin/products/${productId}`, {
                name,
                slug,
                price,
                category,
                image,
                countInStock,
                description,
            })
            dispatch({ type: "UPDATE_SUCCESS" })
            toast.success("Товар успешно обновлен")
            router.push("/admin/products")
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
                                    <h1 className="mb-4 text-xl">{`Изменить продукт с ID ${productId}`}</h1>
                                    <Form.Group className="mb-4" controlId="name">
                                        <Form.Label>Название</Form.Label>
                                        <Form.Control
                                            type="text"
                                            autoFocus
                                            {...register("name", {
                                                required: "Please enter name",
                                            })}
                                        />
                                        {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="slug">
                                        <Form.Label>Slug !</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("slug", {
                                                required: "Please enter slug",
                                            })}
                                        />
                                        {errors.slug && <div className="text-danger">{errors.slug.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="price">
                                        <Form.Label>Цена</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("price", {
                                                required: "Please enter price",
                                            })}
                                        />
                                        {errors.price && <div className="text-danger">{errors.price.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="image">
                                        <Form.Label>Картинка</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("image", {
                                                required: "Please enter image",
                                            })}
                                        />
                                        {errors.image && <div className="text-danger">{errors.image.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("category", {
                                                required: "Please enter category",
                                            })}
                                        />
                                        {errors.category && <div className="text-danger">{errors.category.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="countInStock">
                                        <Form.Label>Количество на складе</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("countInStock", {
                                                required: "Please enter countInStock",
                                            })}
                                        />
                                        {errors.countInStock && <div className="text-danger">{errors.countInStock.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="description">
                                        <Form.Label>Описание</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("description", {
                                                required: "Please enter description",
                                            })}
                                        />
                                        {errors.description && <div className="text-danger">{errors.description.message}</div>}
                                    </Form.Group>
                                    <Button variant="primary" disabled={loadingUpdate} type="submit">
                                        {loadingUpdate ? "Loading" : "Update"}
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

AdminProductEditScreen.auth = { adminOnly: true }
