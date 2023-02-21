import React from "react"
import styles from "../../styles/MainPage.module.scss"
import Carousel from "react-bootstrap/Carousel"
import img1 from "../../public/car/crol.jpg"
import img2 from "../../public/car/img2.jpg"
import img3 from "../../public/car/img3.jpg"
import Image from "next/image"

const CarouselComponent = () => {
    return (
        <div className="container">
            <div className={styles.carous}>
                <div className="row">
                    <div className="col-12 mt-3">
                        {/* <Image src={img1} alt="First slide" className="d-block w-100 h-auto" /> */}
                        <Carousel interval={2900} indicators={false}>
                    <Carousel.Item>
                        <Image src={img1} priority alt="First slide" className="d-block w-100 h-auto"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={img2} priority alt="Second slide" className="d-block w-100 h-auto"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={img3} priority alt="Third slide" className="d-block w-100 h-auto"/>
                    </Carousel.Item>
                </Carousel>
                    </div>
                </div>

                  
            </div>
        </div>
    )
}

export default CarouselComponent
