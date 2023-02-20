import React from 'react'
import styles from "../../styles/MainPage.module.scss"
import img6 from '../../public/car/img6.jpg'
import Image from 'next/image'

const ThirdComponent = () => {
  return (
    <div className="container ">
            <div className={styles.second}>
                <div className="row">
                    <div className="col mt-3">
                    <Image priority src={img6} alt="Special" className="d-block w-100 h-auto"/>
                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default ThirdComponent