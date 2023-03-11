import Head from "next/head"
import Image from "next/image"
import CarouselComponent from "../components/mainPage/Carousel"
import FifthComponent from "../components/mainPage/FifthComponent"
import FourthComponent from "../components/mainPage/FourthComponent"
import SecondComponent from "../components/mainPage/SecondComponent"
import SixthComponent from "../components/mainPage/SixthComponent"
import ThirdComponent from "../components/mainPage/ThirdComponent"
import Meta from "../components/Meta"
import styles from "../styles/Navbar.module.scss"

export default function Home() {
    return (
        <>
        <Meta/>
            <CarouselComponent />
            <SecondComponent />
            <ThirdComponent />
            <FifthComponent />
            <FourthComponent />
            <SixthComponent />
        </>
    )
}
