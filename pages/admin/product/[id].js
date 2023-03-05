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

        case "UPLOAD_REQUEST":
            return { ...state, loadingUpload: true, errorUpload: "" }
        case "UPLOAD_SUCCESS":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: "",
            }
        case "UPLOAD_FAIL":
            return { ...state, loadingUpload: false, errorUpload: action.payload }
        default:
            return state
    }
}

export default function AdminProductEditScreen() {
    const { query } = useRouter()
    const productId = query.id
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] = useReducer(reducer, {
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

    const router = useRouter()

    const uploadHandler = async (e, imageField = "image") => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
        try {
            dispatch({ type: "UPLOAD_REQUEST" })
            const {
                data: { signature, timestamp },
            } = await axios("/api/admin/cloudinary-sign")

            const file = e.target.files[0]
            const formData = new FormData()
            formData.append("file", file)
            formData.append("signature", signature)
            formData.append("timestamp", timestamp)
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
            const { data } = await axios.post(url, formData)
            dispatch({ type: "UPLOAD_SUCCESS" })
            setValue(imageField, data.secure_url)
            toast.success("File uploaded successfully")
        } catch (err) {
            dispatch({ type: "UPLOAD_FAIL", payload: getError(err) })
            toast.error(getError(err))
        }
    }

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
                                        <Form.Label>Slug ! Шифр(буквы и цифры без пробелов)</Form.Label>
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
                                        <Form.Label>Картинка, не менять путь!</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("image", {
                                                required: "Please enter image",
                                            })}
                                        />
                                        {errors.image && <div className="text-danger">{errors.image.message}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="imageFile">Загрузка изображения</Form.Label>
                                        <Form.Control type="file" id="imageFile" onChange={uploadHandler} />

                                        {loadingUpload && <div>Загрузка....</div>}
                                    </Form.Group>
                                    {/* <Form.Group className="mb-4" controlId="category">
                                        <Form.Label>Категория</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("category", {
                                                required: "Please enter category",
                                            })}
                                        />
                                        {errors.category && <div className="text-danger">{errors.category.message}</div>}
                                    </Form.Group> */}
                                    <Form.Group className="mb-4" controlId="category">
                                        <Form.Label>Категория</Form.Label>
                                        <Form.Select
                                            {...register("category", {
                                                required: "Выберите категорию",
                                            })}
                                        >
                                            <option value="Серебро">Серебро</option>
                                            <option value="Бижутерия">Бижутерия</option>
                                            <option value="Часы">Часы</option>
                                            <option value="Сумки">Сумки</option>
                                            <option value="Детские">Детские</option>
                                            <option value="Шарфы">Шарфы</option>
                                            <option value="Парфюмерия">Парфюмерия</option>
                                            <option value="Камни">Камни</option>
                                            <option value="Новинки">Новинки</option>
                                        </Form.Select>
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

AdminProductEditScreen.auth = { adminOnly: true }
