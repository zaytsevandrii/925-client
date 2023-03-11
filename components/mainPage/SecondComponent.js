import Image from "next/image"
import React from "react"
import styles from "../../styles/MainPage.module.scss"
import img4 from "../../public/car/img4.jpg"
import img5 from "../../public/car/img5.jpg"
import Link from "next/link"

const SecondComponent = () => {
    return (
        <div className="container ">
            <div className={styles.second}>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <Link href="/goods/collections">
                            <Image src={img4} alt="Special" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                    <div className="col-md-6 mt-3">
                        <Link href="/goods/bijouterie">
                            <Image src={img5} alt="logo" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondComponent
