import Head from "next/head"

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: "925Kazakhstan",
    keywords: "Серебро оптом, бижутерия, драгоценные камни, шарфы, сумки, часы, серебрянные украшения",
    description:
        "Мы являемся лидером в производстве и продаже стильных и качественных ювелирных изделий из серебра, драгоценных камней, а также разнообразных аксессуаров, включая сумки, шарфы, часы и детские украшения.",
}

export default Meta
