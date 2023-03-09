import React from "react"
import styles from "../styles/Cart.module.scss"

const Address = () => {
    return (
        <>
            <div className={styles.orderHistory}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-12 col-12  mt-3">
                            <h2>Наш адрес</h2>
                            <p> г. Алматы, пр. Сейфуллина 26</p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-12 col-12  mt-3">
                            <h2>Магазины партнеров</h2>
                            <p> г. Алматы, пр. Сейфуллина 26</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Address
