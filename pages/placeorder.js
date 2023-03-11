import axios from "axios"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Cart.module.scss"
import { Store } from "../utils/Store"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"

function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { cartItems, shippingAddress } = cart

    const { data: session } = useSession()
    
    const [k,setK] = useState(1)
    useEffect(() => {
        if (cartItems.length===0) {
            router.push('/')
        }
    }, [cartItems.length, router])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/users2/${session.user._id}`)
                setK(data.k)
                /* setValue("k", data.k) */
            } catch (err) {
                console.log(err)
            }
        }
        if (session?.user) {
            fetchData()
        }
    }, [session])


    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100

    const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price*k, 0)) // 123.4567 => 123.46


    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
  
    const placeOrderHandler = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post('/api/orders', {
          orderItems: cartItems,
          shippingAddress,
          itemsPrice,
        });
        setLoading(false);
        dispatch({ type: 'CART_CLEAR_ITEMS' });
        Cookies.set(
          'cart',
          JSON.stringify({
            ...cart,
            cartItems: [],
          })
        );
        router.push(`/order/${data._id}`);
      } catch (err) {
        setLoading(false);
        toast.error('Необходимо авторизоваться');
      }
    };
    return (
        <>

            <div className={styles.placeOrder}>
               {/*  {cartItems.length === 0 ? (
                    <div>
                        Ваша корзина пустая. <Link href="/">Совершите покупки</Link>
                    </div>
                ) : ( */}
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex align-items-center  justify-content-center">
                                <h1>Разместить заказ</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-9 mt-2">
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="card">
                                            <h5 className="card-header">Данные покупателя</h5>
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.phone}, {shippingAddress.city},  {shippingAddress.country}
                                                </p>
                                                <div style={{ color: "blue" }}>
                                                    <Link href="/user-order-info">редактировать</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="card">
                                            <h5 className="card-header">Заказанные товары</h5>
                                            <div className="card-body">
                                                <table className="table">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th scope="col">Товар</th>
                                                            <th scope="col">Кол-во</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cartItems.map((item) => (
                                                            <tr key={item._id}>
                                                                <td>{item.name} </td>
                                                                <td>{item.quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 mt-4">
                                <div className="card">
                                    <h5 className="card-header">Сумма заказа</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">Всего: {itemsPrice}</h5>

                                        <p className="card-text">
                                            Нужна помощь с заказом? <br /> 8 800 500 500
                                        </p>
                                        <button className="btn btn-dark w-100" onClick={placeOrderHandler}>
                                            Разместить Заказ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
             {/*   )}   */}
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });

PlaceOrderScreen.auth = true;
