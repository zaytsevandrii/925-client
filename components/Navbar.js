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

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    //Для проверки логина
    const { status, data: session } = useSession()

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }

    const handleLoginClose = () => {
        setShowLoginModal(false)
    }
    const allClose = () => {
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
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/' });
      };

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
                    <Image src="/loc.svg" alt="карта" width={37} height={37} />
                    <Image src="/phone.svg" alt="телефон" width={37} height={37} />{" "}
                    <Image src="/search.svg" alt="поиск" width={37} height={37} className={styles.img1} />
                    {!session?.user &&<Image
                        src="/user.svg"
                        alt="логин"
                        width={37}
                        height={37}
                        className={styles.img2}
                        onClick={handleLoginClick}
                    />}
                    
                </div>
                <ul>
                    <Link href="/goods/collections">
                        <li onClick={closeModal}>Коллекции</li>
                    </Link>
                        
                    <Link href="/goods/earings">
                        <li onClick={closeModal}>Серьги </li>
                    </Link>

                    <Link href="/goods/rings">
                        <li onClick={closeModal}>Кольца </li>
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
                                    <div className={styles.map}>
                                        <Image src="/loc.svg" alt="search" width={23} height={23} />

                                        <div>
                                            АСТАНА <br />
                                            пунткты выдачи
                                        </div>
                                    </div>
                                    <div className={styles.phone}>
                                        <Image src="/phone.svg" alt="search" width={23} height={23} />
                                        <div>
                                            8 800 500 500 <br />
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
                                    <Image src="/search.svg" alt="search" width={23} height={23} className={styles.img1} />
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
                                                <DropDownLink className={styles.dropdown} userName={session.user.name} logoutClickHandler={logoutClickHandler} session={session}/>
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
                            <li>Коллекции</li>
                        </Link>
                        <Link href="/goods/earings">
                            <li>серьги</li>
                        </Link>
                        <Link href="/goods/rings">
                            <li>кольца</li>
                        </Link>
                        <Link href="/goods/necklaces">
                            <li>ожерелья</li>
                        </Link>
                        <Link href="/goods/pendants">
                            <li>подвески</li>
                        </Link>
                        <Link href="/goods/bracelets">
                            <li>браслеты</li>
                        </Link>
                        <Link href="/delivery">
                            <li>доставка и оплата</li>
                        </Link>
                        <Link href="/about">
                            <li>о нас</li>
                        </Link>
                    </div>
                </div>
                <LoginModal show={showLoginModal} handleClose={handleLoginClose} allClose={allClose} />
            </div>
        </>
    )
}

export default Navbar
