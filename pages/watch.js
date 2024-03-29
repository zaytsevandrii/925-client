import React from "react"
import Meta from "../components/Meta"
import styles from "../styles/Cart.module.scss"

const WatchScreen = () => {
    return (
        <><Meta title='Часы на заказ' description=' У нас вы можете заказать оригинальные или качественные реплики часов, которые можно заказать по своему вкусу. Наши часы изготавливаются только из высококачественных материалов и обеспечивают высокую точность хода. '/>
            <div className={styles.orderHistory} style={{textAlign:'justify'}}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-12 col-12  mt-3">
                            <h2>Часы на заказ</h2>
                            <p>
                                У нас вы можете заказать оригинальные или качественные реплики часов, которые можно заказать по
                                своему вкусу. Наши часы изготавливаются только из высококачественных материалов и обеспечивают
                                высокую точность хода. Мы предлагаем широкий ассортимент часов, включая мужские, женские и унисекс
                                модели различных брендов, таких как Tissot, Casio, Daniel Klein, Freelook, Tag Heuer, Omega, Breitling и многие другие. Вы также
                                можете заказать часы с индивидуальным дизайном и нанесением логотипа.
                            </p>
                            <p>
                                Наши реплики точно копируют оригинальный дизайн и технические характеристики, что позволяет носить
                                эти часы с уверенностью в их качестве и надежности. Мы предоставляем гарантию на все наши часы и
                                обеспечиваем быструю доставку по всему миру.
                            </p>
                            <p>
                                Если Вы ищете идеальный подарок для себя или для своих близких, то раздел Часы на заказ -
                                идеальный выбор. Наши часы отличаются стильным дизайном и высоким качеством, что делает их
                                прекрасным подарком для любого повода. Закажите у нас свои часы сегодня и наслаждайтесь стильным и
                                точным временем.
                            </p>
                            <p>
                                За более подробной информацией вы можете связаться с нашим менеджером по выше указанным номерам
                                телефонов
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WatchScreen
