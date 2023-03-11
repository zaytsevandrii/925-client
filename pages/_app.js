import "../styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "../components/Layout"
import { StoreProvider } from "../utils/Store"
import { SessionProvider, useSession } from "next-auth/react"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"
import Script from "next/script"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <>
            <Script id="my-script"
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script strategy="lazyOnload">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
            </Script>
            <SessionProvider session={session}>
                <StoreProvider>
                    <Layout>
                        {Component.auth ? (
                            <Auth adminOnly={Component.auth.adminOnly}>
                                <Component {...pageProps} />
                            </Auth>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </Layout>
                </StoreProvider>
            </SessionProvider>
        </>
    )
}

function Auth({ children, adminOnly }) {
    const router = useRouter()
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/unauthorized?message=login required")
        },
    })
    if (status === "loading") {
        return <div>Loading...</div>
    }
    if (adminOnly && !session.user.isAdmin) {
        router.push("/unauthorized?message=admin login required")
    }

    return children
}

export default MyApp
