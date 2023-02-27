import { useRouter } from "next/router"
import React, { useContext } from "react"
import styles from "../../styles/ProductScreen.module.scss"
import Image from "next/image"
import { Store } from "../../utils/Store"
import { useSession } from "next-auth/react"
import Product from "../../models/Product"
import db from "../../utils/db"

const ProductScreen = (props) => {
    const {product} = props
    const router = useRouter()
    const { state, dispatch } = useContext(Store)

    if (!product) {
        return <div>product Not Found</div>
    }

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((item) => item.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product.countInStock < quantity) {
            alert("Извините. Товара нет в наличии")
            return
        }
        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
        /*  router.push('/basket') */
    }

    const { status, data: session } = useSession()
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
                            {status === "loading" ? (
                                <p>Цена: {product.price} тенге</p>
                            ) : session?.user ? (
                                <p>Цена: {product.salePrice} тенге</p>
                            ) : (
                                <p>Цена: {product.price} тенге</p>
                            )}
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
            </div>
        </div>
    )
}

export default ProductScreen


export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
      props: {
        product: product ? db.convertDocToObj(product) : null,
      },
    };
  }