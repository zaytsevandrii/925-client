import Image from 'next/image'
import React, { useContext } from 'react'
import img2 from '../../../public/collections/ring1.jpg'
import styles from '../../../styles/Cart.module.scss'
import { Store } from '../../../styles/utils/Store'


const CartItem = ({item}) => {
    const {dispatch} = useContext(Store)
    const removeItemHandler=(item)=>{
        dispatch({type:'CART_REMOVE_ITEM',payload:item})
    }
  return (
    
                                <div className="row mt-2">
                                    <div className="d-flex col-xl-2 col-md-3 justify-content-center ">
                                        <div className={styles.image}>
                                            <Image src={item.image} width={300} height={300} alt="ring" className="w-100 h-auto " />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <h5>{item.name}</h5>
                                        </div>
                                       
                                        <div className="row">
                                            <p className='my-0'>Цена: {item.price}</p>
                                        </div>
                                        <div className="row">
                                            <p className='my-1'>Количество: {item.quantity}</p>
                                        </div>
                                        <div className="row" >
                                            
                                                 <p  className='my-1'><Image src='/trash.svg' width={24} height={24} onClick={removeItemHandler(item)} style={{cursor:'pointer'}}/> <span style={{cursor:'pointer'}}> Удалить</span></p>
                                        </div>
                                    </div>
                                   
                                </div>
                        
  )
}

export default CartItem