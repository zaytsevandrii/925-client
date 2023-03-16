import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useEffect, useReducer, useState } from "react"
import ProductItem from "../../components/goods/ProductItem"
import styles from "../../styles/Rings.module.scss"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import Meta from "../../components/Meta"
import SkeletonCard from "../../components/Skeleton/SkeletonCard"

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
const pageSize = 40

export default function Сollections() {
    const { status, data: session } = useSession()
    const [k, setK] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOption, setSortOption] = useState(null)
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: "",
    })
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/serebro`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        fetchOrders()
    }, [])
    const handleSortChange = (e) => {
        setSortOption(e.target.value)
        setCurrentPage(1) // Пагинация
    }

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
    }, [session])

    let sortedProducts = [...products]

    if (sortOption === "priceAsc") {
        sortedProducts.sort((a, b) => a.price - b.price)
    } else if (sortOption === "priceDesc") {
        sortedProducts.sort((a, b) => b.price - a.price)
    } else if (sortOption === "new") {
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    //Пагинация страницы внизу!
    const pageCount = Math.ceil(sortedProducts.length / pageSize)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * pageSize
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize)

    return (
        <>
            <Meta
                title="Серебро оптом и в розницу"
                keywords="серьги, ожерелья, подвески, кольца, браслеты, цепоки"
                description="Мы предлагаем твоары из серебра высочайшего качества и по доступной цене"
            />
            <div className={styles.rings}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-4 col-md-6 formAction mt-3 ">
                            <select className="form-control " onChange={handleSortChange}>
                                <option value="">Сортировать</option>
                                <option value="priceAsc">Цена: по возрастанию</option>
                                <option value="priceDesc">Цена: по убыванию</option>
                                <option value="new">Новинки</option>
                            </select>
                        </div>
                        <div className="col-lg-12 col-12  mt-2">
                            {loading ? (
                                <div className="row">
                                    {[...new Array(12)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="alert-error">{error}</div>
                            ) : (
                                <div className="row">
                                    {paginatedProducts.map((product) => (
                                        <ProductItem product={product} key={product.slug} k={k} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="Page navigation">
                                <ul className="pagination mt-2">
                                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                                        <li key={page} className={`page-item${currentPage === page ? " active" : ""}`}>
                                            {/* <button className="page-link bg-dark" onClick={() => handlePageChange(page)}> */}
                                            <button
                                                className={`page-link ${currentPage === page ? "bg-dark" : ""}`}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
