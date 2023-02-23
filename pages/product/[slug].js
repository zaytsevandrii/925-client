import { useRouter } from "next/router"
import React from "react"
import data from "../../styles/utils/data"
import styles from "../../styles/ProductScreen.module.scss"
import Image from "next/image"

const ProductScreen = () => {
    const { query } = useRouter()
    const { slug } = query
    const product = data.products.find((product) => product.slug === slug)
    if (!product) {
        return <div>product Not Found</div>
    }
    return (
        <div className="container ">
            <div className={styles.product}>
                <div className="row">
                    <div className="col-md-5 mt-3">
                        <Image src={product.image} alt={product.name} width={500} height={500} className="w-100 h-auto" />
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="row">
                            <h2>{product.name}</h2>
                        </div>
                        <div className="row">
                            <p>Цена: {product.price} тенге</p>
                        </div>
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
                                    <button type="button" className="btn btn-dark w-100">
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
            </div>
        </div>
    )
}

export default ProductScreen
