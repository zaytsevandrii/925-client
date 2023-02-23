import Image from "next/image"
import React from "react"
import img1 from "../public/collections/cart.svg"
import styles from "../styles/Cart.module.scss"
const basket = () => {
    return (
        <>
            <div className={styles.cart}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center  justify-content-center">
                            <h1>Корзина</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center  justify-content-center">
                            <h2>Вы пока ничего не положили в корзину</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center  justify-content-center">
                            <Image className={styles.empty} src={img1} alt="корзина" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center  justify-content-center">
                            <p>Но это никогда не поздно исправить :)</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center  justify-content-center">
                            <div className={styles.back}>
                                <button type="button" className="btn btn-dark p-2">
                                    Вернуться за покупками
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default basket
