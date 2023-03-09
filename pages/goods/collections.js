import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import ProductItem from "../../components/goods/ProductItem"
import Product from "../../models/Product"
import styles from "../../styles/Rings.module.scss"
import db from "../../utils/db"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

const Сollections = ({ products }) => {
    const { status, data: session } = useSession()
    const [k, setK] = useState(1)

    const [sortOption, setSortOption] = useState(null)

    const handleSortChange = (e) => {
        setSortOption(e.target.value)
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
    return (
        <>
            <div className={styles.rings}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-4 col-md-6 formAction mt-3 ">
                          
                            {/*  <Form.Group className="mt-3">
                                <Form.Label>Сортировка</Form.Label>
                                <Form.Control as="select">
                                    <option value="""">Сортировать</option>
                                    <option value="priceAsc">Цена: по возрастанию</option>
                                    <option value="priceDesc">Цена: по убыванию</option>
                                    <option value="new">Новинки</option>
                                </Form.Control>
                            </Form.Group> */}
                            <select className="form-control " onChange={handleSortChange}>
                                <option value="">Сортировать</option>
                                <option value="priceAsc">Цена: по возрастанию</option>
                                <option value="priceDesc">Цена: по убыванию</option>
                                <option value="new">Новинки</option>
                            </select>
                        </div>
                        <div className="col-lg-12 col-12  mt-2">
                            <div className="row">
                                {sortedProducts.map((product) => (
                                    <ProductItem product={product} key={product.slug} k={k} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Сollections

export async function getStaticProps() {
    await db.connect()
    const products = await Product.find().lean()
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    }
}
