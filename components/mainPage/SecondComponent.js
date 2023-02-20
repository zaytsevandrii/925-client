import Image from "next/image"
import React from "react"
import styles from "../../styles/MainPage.module.scss"
import img4 from '../../public/car/img4.jpg'
import img5 from '../../public/car/img5.jpg'

const SecondComponent = () => {
    return (
        <div className="container ">
            <div className={styles.second}>
                <div className="row">
                    <div className="col-md-6 mt-3">
                    <Image src={img4} alt="Special" className="d-block w-100 h-auto"/>
                    </div>
                    <div className="col-md-6 mt-3">
                    <Image src={img5} alt="logo" className="d-block w-100 h-auto"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondComponent
