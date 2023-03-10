import Image from "next/image"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import styles from "../../styles/Rings.module.scss"
import axios from "axios"

const ProductItem = ({ product,k }) => {
    const { status, data: session } = useSession()

    return (
        <li className="col-md-3 col-6">
            <div className="card border-0 p-1 ">
                <Link href={`/product/${product.slug}`} className="card2">
                    <Image src={product.image} alt="ring" className="d-block w-100 h-auto " width={400} height={400} blurDataURL={product.image} placeholder='blur' />
                </Link>
                <div className="card-body p-2">
                    <h6>{product.name}</h6>

                    <div className={styles.cardBottom}>
                        {status === "loading" ? (
                            <p className="card-text">{product.price} ₸</p>
                        ) : session?.user ? (
                            <p className="card-text">{product.price*k} ₸</p>
                        ) : (
                            <p className="card-text">{product.price} ₸</p>
                        )}
                        
                        {/*  <button type="button" className="btn btn-dark px-2">
                            Добавить
                        </button> */}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ProductItem
