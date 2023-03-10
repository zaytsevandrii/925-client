import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useReducer } from "react"
import styles from "../../styles/Cart.module.scss"
import { getError } from "../../utils/error"

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, order: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

function OrderScreen() {
    const { query } = useRouter()
    const orderId = query.id

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
    })

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/orders/${orderId}`)
                console.log(data)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder()
        }
    }, [order, orderId])
    const {
        shippingAddress,
        orderItems,
        itemsPrice,
      
      } = order;

    return (
        <>
            <div className={styles.placeOrder}>
                {loading ? (
                    <div className="container col-12 d-flex align-items-center  justify-content-center">
                        <h1>Заказ обрабатывается...</h1>
                    </div>
                ) : error ? (
                    <div className="container col-12 d-flex align-items-center  justify-content-center">
                        <h2 >Заказ обрабатывается...</h2>
                    </div>
                ) : (
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex align-items-center  justify-content-center">
                                <h1>Заказ успешно обработан</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex align-items-center  justify-content-center">
                                <h3>ID вашего заказа № {orderId.substring(20, 24)}</h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-9 mt-2">
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="card">
                                            <h5 className="card-header">Данные покупателя</h5>
                                            <div className="card-body">
                                                <h6 className="card-text">
                                                    {shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.phone}, {shippingAddress.city}, {shippingAddress.country}
                                                </h6>
                                                
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
                                                          {orderItems.map((item) => (
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
                                        <h6 className="card-title">Всего: {itemsPrice} ₸</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 d-flex align-items-center  justify-content-center">
                                <h2>Спасибо, что вы нас выбрали</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex align-items-center  justify-content-center">
                                <h6>Мы с Вами свяжемся в ближайшее время</h6>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

OrderScreen.auth = true
export default OrderScreen
