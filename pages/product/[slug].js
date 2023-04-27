import { useRouter } from "next/router"
import React, { useContext, useEffect, useReducer, useState } from "react"
import styles from "../../styles/ProductScreen.module.scss"
import Image from "next/image"
import { Store } from "../../utils/Store"
import { useSession } from "next-auth/react"
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../utils/error"
import MyLoader3 from "../../components/Skeleton/SkeletonProduct"
import SkeletonText from "../../components/Skeleton/SkeletonText"
import Meta from "../../components/Meta"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, product: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

const ProductScreen = () => {
    const [{ loading, error, product }, dispatch2] = useReducer(reducer, {
        loading: true,
        product: {},
        error: "",
    })
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const [k, setK] = useState(1)
    const { status, data: session } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch2({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/goods/${router.query.slug}`)
                dispatch2({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch2({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }

        fetchData()
    }, [router.query.slug])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/users2/${session.user._id}`)
                setK(data.k)
            } catch (err) {
                console.log(err)
            }
        }
        if (session?.user) {
            fetchData()
        }
    }, [session, product])

    if (!product) {
        return <div className={styles.product}>Товар не найден</div>
    }

    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find((item) => item.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        /* const { data } = await axios.get(`/api/products/${product._id}`) */

        if (product.countInStock < quantity) {
            return toast.error("Извините. Товара нет в наличии")
        }

        const price = k < 1 ? Math.round(product.price * k) : product.price; // Добавление k в store
        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity, price } })
        /*  router.push('/basket') */
    }

    return (
       <><Meta title={product.name} description={product.description}/>
        <div className="container ">
            <div className={styles.product}>
                {loading ? (
                    <div className="row">
                        <div className="col-md-5 mt-3 card2">
                           <MyLoader3 className="w-100 h-auto" uniqueKey="my-random-value"/>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="row">
                                <h2><SkeletonText className="w-100 h-auto" uniqueKey="my-random-value1"/></h2>
                            </div>
                            <div className="row">
                                <p> <SkeletonText className="w-100 h-auto" uniqueKey="my-random-value1"/> </p>
                            </div>
                            <div className="row">
                                <p><SkeletonText className="w-100 h-auto" uniqueKey="my-random-value1"/>  </p>
                            </div>

                            <div className="row">
                                <p><SkeletonText className="w-100 h-auto" uniqueKey="my-random-value1"/> </p>
                            </div>
                            <div className="row">
                                <p ><SkeletonText className="w-100 h-auto" uniqueKey="my-random-value1"/> </p>
                            </div>
                            <div className="row">
                                <p><SkeletonText className="w-100 h-auto" uniqueKey="my-random-value1"/> </p>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert-error">{error}</div>
                ) : (
                    <div className="row">
                        <div className="col-md-5 mt-3 p-0 card2">
                            <Image src={product.image} alt={product.name} width={500} height={500} className="w-100 h-auto" />
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="row">
                                <h2>{product.name}</h2>
                            </div>
                            <div className="row">
                                {status === "loading" ? (
                                    <p>Цена: {product.price} ₸</p>
                                ) : k < 1 ? (
                                    <p>
                                        Старая цена: <span style={{ textDecoration: "line-through" }}>{product.price} ₸</span>
                                    </p>
                                ) : (
                                    <p>Цена: {product.price} ₸</p>
                                )}
                            </div>
                            {k < 1 && (
                                <div className="row">
                                    <p>Оптовая цена: {Math.round(product.price * k)} ₸</p>
                                </div>
                            )}
                            <div className="row">
                                <p>Категория: {product.category}</p>
                            </div>
                            <div className="row">
                                <p>Статус: {product.countInStock > 0 ? "В наличии" : "недоступен"}</p>
                            </div>
                            <div className="row">
                                <p>Описание: {product.description}</p>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-12">
                                    {product.countInStock > 0 ? (
                                        <button type="button" className="btn btn-dark w-100" onClick={addToCartHandler}>
                                            Добавить в корзину
                                        </button>
                                    ) : (
                                        <button type="button" className="btn btn-dark w-100" disabled>
                                            Добавить в корзину
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
       </>
    )
}

export default ProductScreen

/* export async function getServerSideProps(context) {
    const { params } = context
    const { slug } = params
    console.log(slug)
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    }
} */
