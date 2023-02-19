import React, { useState } from "react"
import styles from "../styles/Navbar.module.scss"
import logo from "../public/logo.png"
import logo2 from "../public/logo2.png"
import Image from "next/image"
import Hamburger from "./Hamburger"

const Navbar = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className={styles.navbar}>
                <div className="container">
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
                                    <Hamburger />
                                </div>
                            </div>
                            <div className="col-4  d-flex  justify-content-center">
                                <div className={styles.center}>
                                    <Image src={logo} width={140} alt="logo" />
                                </div>
                            </div>
                            <div className="col-4  d-flex align-items-center justify-content-end">
                                <div className={styles.right}>
                                    <Image src="/search.svg" alt="search" width={23} height={23} className={styles.img1} />
                                    <Image src="/user.svg" alt="user" width={28} height={28} className={styles.img2} />
                                    <Image src="/cart.svg" alt="cart" width={23} height={23} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </>
    )
}

export default Navbar
