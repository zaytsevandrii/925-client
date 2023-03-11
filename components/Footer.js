import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import dimax from "../public/logo.png"
import img from "../public/whatsapp.svg"
import styles from "../styles/Footer.module.scss"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <footer className="page-footer font-small blue pt-4 mt-3 main__footer">
                <div className="container text-center text-md-left main__footer">
                    <div className="row">
                        <div className="col-md-4 mt-md-0 ">
                            <h5 className="text-uppercase">
                                <Image alt="Dimax media logo" src={dimax} width={120} height={60} />
                            </h5>

                            <div className="sub-title mt-1" style={{ marginTop: "-14px", marginBottom: "4px" }}>
                                <a href="tel:+380631517990" className="col-item" style={{ marginLeft: "10px", color: "#fff" }}>
                                    <Image src="/phone.svg" alt="search" width={20} height={20} /> 8 7775 623 49 63
                                </a>
                            </div>
                            <div className="sub-title mt-1" style={{ marginTop: "-14px", marginBottom: "4px" }}>
                                E-mail:
                                <a
                                    href="mailto:info@925kazakhstan.com"
                                    className="col-item"
                                    style={{ marginLeft: "10px", color: "#fff" }}
                                >
                                    info@925.com
                                </a>
                            </div>
                            <a href="https://wa.me/87756234963" target="_blank" rel="noreferrer">
                                <Image src={img} alt="whatsapp" width={25} height={25} style={{ marginRight: "10px" }} />
                                <span className="social-item-text" style={{ color: "#73BE73" }}>
                                    WhatsApp
                                </span>
                            </a>
                        </div>

                        <hr className="clearfix w-100 d-md-none mt-2 pt-0" />

                        <div className="col-md-4 mb-md-0 mb-3">
                            <h5 className="text-uppercase">ПОКУПАТЕЛЯМ</h5>
                            <ul className="list-unstyled">
                                <Link href="/delivery">
                                    <li>Доставка и оплата</li>
                                </Link>
                                <Link href="/quality">
                                    <li>Гарантия качества</li>
                                </Link>
                                <Link href="/watch">
                                    <li>Часы на заказ</li>
                                </Link>
                                <Link href="/jewelry">
                                    <li>Ювелирные украшения</li>
                                </Link>
                            </ul>
                        </div>

                        <div className="col-md-4 mb-md-0 mb-3">
                            <h5 className="text-uppercase">НАША КОМПАНИЯ</h5>
                            <ul className="list-unstyled">
                            <Link href="/about"><li>О нас</li></Link>
                            <Link href="/optscreen"><li>Партнерам</li></Link>
                                <Link href="/franchise"><li>Франчайзинг</li></Link>
                                <Link href="/legal-terms"><li>Правовая Информация</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright text-center py-3">
                    <div>
                        Все права защищены © 2023
                        <span style={{ fontSize: "18px" }}> 925Kazakhstan</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer

/* import React from "react"
import styles from "../styles/Footer.module.scss"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className="container py-1 mt-3">
                <div className="col-sm-12  ">
                    
                    <div className="row">
                        <div className="col-md-4  d-flex align-items-center justify-content-center">
                            <div className={styles.left}>
                                <ul>
                                    ПОКУПАТЕЛЯМ
                                    <li>СКУПКА И ОБМЕН</li>
                                    <li>ГАРАНТИЯ КАЧЕСТВА</li>
                                    <li>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4  d-flex align-items-center  justify-content-center">
                            <div className={styles.center}>
                                <ul>
                                    НАША КОМПАНИЯ
                                    <li>НОВОСТИ</li>
                                    <li>ПАРТНЁРАМ</li>
                                    <li>ФРАНЧАЙЗИНГ</li>
                                    <li>ПРАВОВАЯ ИНФОРМАЦИЯ</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4  d-flex align-items-center justify-content-center">
                            <div className={styles.right}>
                                <ul>
                                    КОНТАКТЫ
                                    <li>СКУПКА И ОБМЕН</li>
                                    <li>ГАРАНТИЯ КАЧЕСТВА</li>
                                    <li>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12  d-flex align-items-center "> <div className={styles.company}>925 KAZAKHSTAN</div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
 */
