import React from "react"
import styles from "../../styles/Rings.module.scss"
import img1 from "../../public/collections/ring1.jpg"
import Image from "next/image"

const rings = () => {
    return (
        <>
            <div className={styles.rings}>
                <div className="container">
                    <div className="row ">
                        <div className="col-3 filtrMenu d-lg-block d-md-none fixed-left" >
                           Тут будет фильтрация
                        </div>
                        <div className="col-lg-9 col-12">
                            <div className="row">
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6 ">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-4 col-6">
                                    <div class="card border-0 p-2">
                                        <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                                        <div class="card-body">
                                            <h6>Кольцо с камнем</h6>
                                            <p class="card-text">5000 тенге</p>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default rings
