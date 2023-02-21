import React from "react"
import Image from "next/image"
import styles from "../../styles/MainPage.module.scss"
import img7 from "../../public/car/img7.jpg"
import img8 from "../../public/car/img8.jpg"
import img9 from "../../public/car/img9.jpg"
import Link from "next/link"

const FourthComponent = () => {
    return (
        <div className="container ">
            <div className={styles.four}>
                <div className="row">
                    <div className="col-md-4 mt-3">
                        <Link href="/goods/earings">
                            <Image src={img7} alt="Special" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                    <div className="col-md-4 mt-3">
                        <Link href="/goods/pendants">
                            <Image src={img8} alt="Special" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                    <div className="col-md-4 mt-3">
                        <Link href="/goods/rings">
                            <Image src={img9} alt="logo" className="d-block w-100 h-auto" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FourthComponent
