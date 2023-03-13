import axios from "axios"
import { useSession } from "next-auth/react"
import React, { Suspense, useEffect, useState } from "react"
import ProductItem from "../../components/goods/ProductItem"
import Product from "../../models/Product"
import styles from "../../styles/Rings.module.scss"
import db from "../../utils/db"

export default function CheckPage({ products }) {
    const { status, data: session } = useSession()
    const [k, setK] = useState(1)

    return (
        <>
            <Suspense fallback={<p>Loading feed...</p>}>
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
            </Suspense>
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
