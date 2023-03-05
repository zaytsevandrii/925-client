import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import { Store } from "../../utils/Store"
import { useSession } from "next-auth/react"
import styles from "../../styles/Rings.module.scss"

const ProductItem = ({ product }) => {
    const { state, dispatch } = useContext(Store)
    const { status, data: session } = useSession()
    const k = session?.user?.k || 1;
    console.log(k)
    return (
        <li className="col-md-4 col-6">
            <div className="card border-0 p-1">
                <Link href={`/product/${product.slug}`}>
                    <Image src={product.image} alt="ring" className="d-block w-100 h-auto" width={400} height={400} />
                </Link>
                <div className="card-body p-2">
                    
                        <h6>{product.name}</h6>
                        
                    <div className={styles.cardBottom}>
                    {status === "loading" ? (
                        <p className="card-text">{product.price} тенге</p>
                    ) : session?.user ? (
                        <p className="card-text">{product.price*k} тенге</p>
                    ) : (
                        <p className="card-text">{product.price} тенге</p>
                    )}
                  {/*  <button type="button" className="btn btn-dark px-2">
                            Добавить
                        </button> */}</div>
                </div>
            </div>
        </li>
    )
}

export default ProductItem
