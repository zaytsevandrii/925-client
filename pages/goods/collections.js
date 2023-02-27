import React from 'react'
import ProductItem from '../../components/goods/ProductItem'
import Product from '../../models/Product'
import styles from "../../styles/Rings.module.scss"
import db from '../../utils/db'

const Сollections = ({products}) => {
  return (
    <>
    <div className={styles.rings}>
        <div className="container">
            <div className="row ">
                <div className="col-3 filtrMenu d-lg-block d-none fixed-left" >
                   Тут будет фильтрация
                </div>
                <div className="col-lg-9 col-12  mt-2">
                    <div className="row">
                        {products.map(product =>(
                          <ProductItem product={product} key={product.slug}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default Сollections


export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}