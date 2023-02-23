import Image from "next/image"
import React from "react"
import img1 from '../../public/collections/ring1.jpg'

const Product = () => {
    return (
        <li className="col-md-4 col-6">
            <div className="card border-0 p-1">
                <Image src={img1} alt="ring" className="d-block w-100 h-auto" />
                <div className="card-body p-2">
                    <h6>Кольцо с камнем</h6>
                    <p className="card-text">5000 тенге</p>
                </div>
            </div>
        </li>
    )
}

export default Product
