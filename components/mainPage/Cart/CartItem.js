import Image from "next/image"
import React, { useContext } from "react"
import img2 from "../../../public/collections/ring1.jpg"
import styles from "../../../styles/Cart.module.scss"
import { Store } from "../../../utils/Store"

const CartItem = ({ item }) => {
    const { state, dispatch } = useContext(Store)
    const removeItemHandler = (item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item })
    }
    const {
        cart: { cartItems },
    } = state
    console.log(cartItems)
    const addToCartHandler = (product, isAdd) => {
        const existItem = state.cart.cartItems.find((item) => item.slug === product.slug)
        let quantity = existItem ? existItem.quantity : 0

        if (isAdd) {
            quantity += 1
        } else {
            quantity -= 1
        }

        if (quantity < 1) {
            dispatch({ type: "CART_REMOVE_ITEM", payload: product })
        } else if (product.countInStock < quantity) {
            alert("Извините. Товара больше нет в наличии")
            return
        } else {
            dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
        }
    }
    return (
        <div className="row my-2">
            <div className="d-flex col-xl-2 col-md-3 justify-content-center ">
                <div className={styles.image}>
                    <Image src={item.image} width={300} height={300} alt="ring" className="w-100 h-auto " />
                </div>
            </div>
            <div className="col-md-9">
                <div className="row">
                    <h5>{item.name}</h5>
                </div>

                <div className="row">
                    <p className="my-0">Цена: {item.price}</p>
                </div>
                <div className="row">
                    <div className="my-1 d-flex">
                        Количество:{" "}
                        <button className="btn btn-dark py-0 px-1 mx-1" onClick={() => addToCartHandler(item, true)}>
                            +
                        </button>
                        {item.quantity}
                        <button className="btn btn-dark py-0 px-2 mx-1" onClick={() => addToCartHandler(item, false)}>
                            -
                        </button>
                    </div>
                </div>
                <div className="row">
                        <div className="my-1 w-auto" onClick={() => removeItemHandler(item)}>
                            <Image src="/trash.svg" alt="корзина" width={24} height={24} style={{ cursor: "pointer" }} />
                            <span style={{ cursor: "pointer" }}> Удалить</span>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
