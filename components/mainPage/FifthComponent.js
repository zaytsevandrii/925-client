import React from "react"
import styles from "../../styles/MainPage.module.scss"
import img10 from "../../public/car/img10.jpg"
import img11 from "../../public/car/img11.jpg"
import Image from "next/image"
import Link from "next/link"

const FifthComponent = () => {
    return (
        <div className="container ">
            <div className={styles.five}>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <Link href="/goods/watch">
                            <Image src={img10} alt="Special" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                    <div className="col-md-6 mt-3">
                        <Link href="/goods/children-jewelry">
                            <Image src={img11} alt="logo" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FifthComponent
