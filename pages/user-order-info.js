import Cookies from "js-cookie"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { Store } from "../utils/Store"
import styles from "../styles/Cart.module.scss"
import Meta from "../components/Meta"

const UserOrderScreen = () => {
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")

    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingAddress } = cart
    const router = useRouter()
    useEffect(() => {
        if (cart.cartItems.length === 0) {
            router.push("/")
        }
    }, [cart.cartItems.length, router])

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: { fullName, address, phone, city, country },
        })
        Cookies.set(
            "cart",
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    phone,
                    city,
                    country,
                },
            })
        )

        router.push("/placeorder")
    }

    return (
        <>
            <Meta title="Оформление заказа" />
            <div className={styles.order}>
                <Container>
                    <h2 className="text-center mt-4">Оформление заказа</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center mt-4">
                            <Col md={6} sm={12}>
                                <Form.Group controlId="formFullName">
                                    <Form.Label>Полное Имя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите ваше полное имя"
                                        value={fullName}
                                        onChange={(event) => setFullName(event.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAddress" className="mt-2">
                                    <Form.Label>Адрес</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите ваш адрес"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCity" className="mt-2">
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите ваш номер"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCity" className="mt-2">
                                    <Form.Label>Город</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите ваш город"
                                        value={city}
                                        onChange={(event) => setCity(event.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCountry" className="mt-2">
                                    <Form.Label>Страна</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите вашу страну"
                                        value={country}
                                        onChange={(event) => setCountry(event.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="dark" type="submit" className="mt-4 w-100">
                                    Далее
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default UserOrderScreen
