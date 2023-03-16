import Image from "next/image"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import styles from "../../styles/Rings.module.scss"
import axios from "axios"
import MyLoader from "./Skeleton"

const SkeletonCard = () => {
    return (
        <li className="col-md-3 col-6 " >
            <div className="card border-0 p-1 ">
                <MyLoader className="d-block w-100 h-auto" uniqueKey="my-random-value"/>
                
            </div>
        </li>
    )
}

export default SkeletonCard
