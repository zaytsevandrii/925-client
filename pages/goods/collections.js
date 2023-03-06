import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ProductItem from '../../components/goods/ProductItem'
import Product from '../../models/Product'
import styles from "../../styles/Rings.module.scss"
import db from '../../utils/db'

const Сollections = ({products}) => {
  const { status, data: session } = useSession()
  const [k,setK] = useState(1)
  useEffect(() => {
      const fetchData = async () => {
          try {
              const { data } = await axios.get(`/api/admin/users2/${session.user._id}`)
              setK(data.k)
              /* setValue("k", data.k) */
          } catch (err) {
              console.log(err)
          }
      }
      if (session?.user) {
          fetchData()
      }
  }, [session])
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
                          <ProductItem product={product} key={product.slug} k={k}/>
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