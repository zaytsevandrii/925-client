import React from "react"
import styles from "../../styles/MainPage.module.scss"
import img10 from "../../public/car/img12.jpg"
import img11 from "../../public/car/img13.jpg"
import Image from "next/image"
import Link from "next/link"

const SixthComponent = () => {
    return (
        <div className="container ">
            <div className={styles.five}>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <Link href="/goods/natural-stones">
                            <Image src={img10} alt="Special" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                    <div className="col-md-6 mt-3">
                        <Link href="/goods/new-product">
                            <Image src={img11} alt="logo" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SixthComponent
