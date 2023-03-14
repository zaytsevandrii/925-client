import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useEffect, useReducer, useState } from "react"
import ProductItem from "../../components/goods/ProductItem"
import MyLoader from "../../components/Skeleton/Skeleton"
import SkeletonCard from "../../components/Skeleton/SkeletonCard"
import Product from "../../models/Product"
import styles from "../../styles/Rings.module.scss"
import db from "../../utils/db"
import { getError } from "../../utils/error"

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

export default function CheckPage(/* { products } */) {
    const { status, data: session } = useSession()
    const [k, setK] = useState(1)
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: "",
    })
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/products`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        fetchOrders()
    }, [])
    return (
        <>
            <div className={styles.rings}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-12 col-12  mt-2">
                            {loading ? (
                                <div className="row">
                                    
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                        <SkeletonCard />
                                </div>
                            ) : error ? (
                                <div className="alert-error">{error}</div>
                            ) : (
                                <div className="row">
                                    {products.map((product) => (
                                        <ProductItem product={product} key={product.slug} k={k} />
                                    ))}
                                    <div>
                                        <SkeletonCard />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    await db.connect()
    const products = await Product.find({}).lean()
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    }
}
