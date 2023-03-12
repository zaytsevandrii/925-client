import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import ProductItem from "../../components/goods/ProductItem"
import Meta from "../../components/Meta"
import Product from "../../models/Product"
import styles from "../../styles/Rings.module.scss"
import db from "../../utils/db"

const pageSize = 40

const BagsScreen = ({ products }) => {
    const { status, data: session } = useSession()
    const [k, setK] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOption, setSortOption] = useState(null)

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
            <Meta title="Сумки оптом и в розницу" description="Мы предлагаем сумки высочайшего качества и по доступной цене" />
            <div className={styles.rings}>
                {!products ? (
                    <div className="container">
                        <div>Загрузка...</div>
                    </div>
                ) : (
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
                                <div className="row">
                                    {paginatedProducts.map((product) => (
                                        <ProductItem product={product} key={product.slug} k={k} />
                                    ))}
                                </div>
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
                )}
            </div>
        </>
    )
}

export default BagsScreen

export async function getServerSideProps() {
    await db.connect()
    const products = await Product.find({ category: "Сумки" }).lean()
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    }
}
