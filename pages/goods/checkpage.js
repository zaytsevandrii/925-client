import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import ProductItem from "../../components/goods/ProductItem"
import Product from "../../models/Product"
import styles from "../../styles/Rings.module.scss"
import db from "../../utils/db"

export default function CheckPage({ products }) {
    const { status, data: session } = useSession()
    const [k, setK] = useState(1)
    const [isLoading, setIsLoading] = useState(true) // добавляем состояние для индикатора загрузки

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

    useEffect(() => {
        setIsLoading(false) // устанавливаем isLoading в false, когда компонент загрузился
    }, [])

    return (
        <>
            {isLoading && (
                <div className="container">
                    <div>Загрузка...</div>
                </div>
            )}{" "}
            {/* условный рендеринг для индикатора загрузки */}
            <div className={styles.rings}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-12 col-12  mt-2">
                            <div className="row">
                                {products.map((product) => (
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

export async function getServerSideProps() {
    await db.connect()
    const products = await Product.find({}).lean()
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    }
}
