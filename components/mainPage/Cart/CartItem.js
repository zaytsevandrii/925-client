import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React, { useContext } from "react"
import styles from "../../../styles/Cart.module.scss"
import { Store } from "../../../utils/Store"
import { toast } from 'react-toastify';

const CartItem = ({ item,k }) => {
    const { state, dispatch } = useContext(Store)
    const removeItemHandler = (item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item })
    }
    const {
        cart: { cartItems },
    } = state
    const addToCartHandler = async (product, isAdd) => {
        const existItem = state.cart.cartItems.find((item) => item.slug === product.slug)
        let quantity = existItem ? existItem.quantity : 0
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (isAdd) {
            quantity += 1
        } else {
            quantity -= 1
        }

        if (quantity < 1) {
            dispatch({ type: "CART_REMOVE_ITEM", payload: product })
        } else if (data.countInStock < quantity) {
            return toast.error("Извините. Товара больше нет в наличии")
        } else {
            dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
        }
    }

    const { status, data: session } = useSession()
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
                      <p className="my-0">Цена: {Math.round(item.price*k)} ₸</p>
                </div>
                <div className="row">
                    <div className="my-1 d-flex">
                        Количество:
                        <div className={styles.btns}>
                            <button className="btn btn-dark py-0 px-1 mx-2" onClick={() => addToCartHandler(item, true)}>
                                +
                            </button>
                        </div>
                        {item.quantity}
                        <div className={styles.btns}>
                            <button className="btn btn-dark py-0 px-1 mx-2" onClick={() => addToCartHandler(item, false)}>
                                –
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="my-1 w-auto" onClick={() => removeItemHandler(item)}>
                        <Image src="/trash.svg" alt="корзина" width={24} height={24} style={{ cursor: "pointer" }} />
                        <span style={{ cursor: "pointer" }}> Удалить</span>
                    </div>
                </div>
            </div>
            <div><hr className='hr'/></div>
        </div>
    )
}

export default CartItem
