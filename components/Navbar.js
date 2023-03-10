import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import styles from "../styles/Navbar.module.scss"
import logo from "../public/logo.png"
import Image from "next/image"
import Hamburger from "./Hamburger"
import Link from "next/link"
import { Store } from "../utils/Store"
import LoginModal from "./LoginModal"
import { signOut, useSession } from "next-auth/react"
import DropDownLink from "./DropDownLink"
import Cookies from "js-cookie"
import SearchModal from "./SearchModal"
import { useRouter } from "next/router"

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    //Для проверки логина
    const { status, data: session } = useSession()
    const router = useRouter()
    const handleSearchClick = () => {
        setShowSearch(true)
    }
    const handleSearchClose = () => {
        setShowSearch(false)
    }

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }

    const handleLoginClose = () => {
        setShowLoginModal(false)
    }
    const allClose = () => {
        setShowSearch(false)
        setShowLoginModal(false)
        setTimeout(() => setOpen(false), 70)
    }
    const { state, dispatch } = useContext(Store)
    const { cart } = state

    const [open, setOpen] = useState(false)
    const openModal = () => {
        setOpen((prev) => !prev)
    }
    const closeModal = () => {
        setTimeout(() => setOpen(false), 70)
    }

    const logoutClickHandler = () => {
        Cookies.remove("cart")
        dispatch({ type: "CART_RESET" })
        signOut({ callbackUrl: "/" })
    }

    const addressClick = () => {
        setTimeout(() => setOpen(false), 70)
        router.push("/address")
    }

    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])
    const modalRef = useRef(null)
    useEffect(() => {
        function handleResize() {
            if (modalRef.current.clientWidth >= 992) {
                // задаем ширину, при которой модальное меню должно закрываться
                setOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (open) {
            document.body.classList.add("stop-scrolling")
        } else {
            document.body.classList.remove("stop-scrolling")
        }
    }, [open])
    return (
        <>
            <div className={`${open && "overlay-show"}`}></div>
            <div id="mobile-menu" className={`mobile-main-menu ${open && "show-menu"}`}>
                <div className="topMobile">
                    <Image src="/loc.svg" alt="карта" width={37} height={37} onClick={addressClick} className="img" />
                   {/*  <a href="tel:+380631517990">
                        <Image src="/phone.svg" alt="телефон" width={37} height={37} className="img" />
                    </a> */}
                    <Image
                        src="/search.svg"
                        alt="поиск"
                        width={37}
                        height={37}
                        className="img"
                        /* className={styles.img1} */
                        onClick={handleSearchClick}
                    />
                    {!session?.user && (
                        <Image
                            src="/user.svg"
                            alt="логин"
                            width={37}
                            height={37}
                            /* className={styles.img2} */
                            className="img"
                            onClick={handleLoginClick}
                        />
                    )}
                </div>
                <ul>
                    <Link href="/goods/collections">
                        <li onClick={closeModal}>Серебро</li>
                    </Link>

                    <Link href="/goods/bijouterie">
                        <li onClick={closeModal}>Бижутерия </li>
                    </Link>

                    <Link href="/goods/watch">
                        <li onClick={closeModal}>Часы </li>
                    </Link>

                    <Link href="/goods/necklaces">
                        <li onClick={closeModal}>Ожерелья</li>
                    </Link>
                    <Link href="/goods/pendants">
                        <li onClick={closeModal}>Подвески</li>
                    </Link>
                    <Link href="/goods/bracelets">
                        <li onClick={closeModal}>Браслеты</li>
                    </Link>
                    <Link href="/delivery">
                        <li onClick={closeModal}>Доставка и оплата</li>
                    </Link>

                    <Link href="/about">
                        <li onClick={closeModal}>О нас </li>
                    </Link>
                </ul>
                <div className="mobile-menu-info">
                    © 2023
                    <span style={{ fontSize: "18px" }}> 925Kazakhstan</span>
                </div>
            </div>
            <div className={styles.navbar} ref={modalRef}>
                <div className="container py-1">
                    <div className="col-sm-12  ">
                        <div className="row">
                            <div className="col-4  d-flex align-items-center">
                                <div className={styles.left}>
                                    <Link href="/address" style={{ color: "#fff" }}>
                                        <div className={styles.map}>
                                            <Image src="/loc.svg" alt="search" width={23} height={23} />
                                            <div>
                                                Наши <br />
                                                пунткты выдачи
                                            </div>
                                        </div>
                                    </Link>
                                    <div className={styles.phone}>
                                        <Image src="/phone.svg" alt="search" width={23} height={23} />
                                        <div>
                                            8 775 623 49 63 <br />
                                            горячая линия
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.leftH}>
                                    <Hamburger open={open} openModal={openModal} />
                                </div>
                            </div>
                            <div className="col-4  d-flex align-items-center  justify-content-center">
                                <div className={styles.center}>
                                    <Link href="/">
                                        <Image src={logo} priority width={130} alt="logo" onClick={closeModal} />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4  d-flex align-items-center justify-content-end">
                                <div className={styles.right}>
                                    <Image
                                        src="/search.svg"
                                        alt="search"
                                        width={23}
                                        height={23}
                                        className={styles.img1}
                                        onClick={handleSearchClick}
                                    />
                                    <div className={styles.user}>
                                        {status === "loading" ? (
                                            <Image
                                                src="/user.svg"
                                                alt="user"
                                                width={28}
                                                height={28}
                                                className={styles.img2}
                                                onClick={handleLoginClick}
                                            />
                                        ) : session?.user ? (
                                            <div className={styles.userName}>
                                                <DropDownLink
                                                    className={styles.dropdown}
                                                    userName={session.user.name}
                                                    logoutClickHandler={logoutClickHandler}
                                                    session={session}
                                                />
                                                {/* {session.user.name.charAt(0).toUpperCase()} */}
                                            </div>
                                        ) : (
                                            <Image
                                                src="/user.svg"
                                                alt="user"
                                                width={28}
                                                height={28}
                                                className={styles.img2}
                                                onClick={handleLoginClick}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.cart}>
                                        <Link href="/basket" alt="корзина" onClick={closeModal}>
                                            {
                                                /* cart.cartItems.length */ cartItemsCount > 0 && (
                                                    <p>
                                                        {cartItemsCount}
                                                        {/* {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} */}
                                                    </p>
                                                )
                                            }

                                            <Image src="/cart.svg" alt="cart" width={23} height={23} className={styles.img3} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.navbar2}>
                    <div className="container  d-flex justify-content-around">
                        <Link href="/goods/collections">
                            <li>Серебро</li>
                        </Link>
                        <Link href="/goods/bijouterie">
                            <li>Бижутерия</li>
                        </Link>
                        <Link href="/goods/watch">
                            <li>Часы</li>
                        </Link>
                        <Link href="/goods/necklaces">
                            <li>Сумки</li>
                        </Link>
                        <Link href="/goods/pendants">
                            <li>Детские украшения</li>
                        </Link>
                        <Link href="/goods/bracelets">
                            <li>Шарфы</li>
                        </Link>
                        <Link href="/delivery">
                            <li>Парфюмерия</li>
                        </Link>
                        <Link href="/about">
                            <li>Натуральные камни</li>
                        </Link>
                        <Link href="/about">
                            <li>Новинки</li>
                        </Link>
                    </div>
                </div>
                <LoginModal show={showLoginModal} handleClose={handleLoginClose} allClose={allClose} />
                <SearchModal show={showSearch} handleClose={handleSearchClose} allClose={allClose} />
            </div>
        </>
    )
}

export default Navbar
