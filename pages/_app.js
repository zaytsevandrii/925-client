import "../styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "../components/Layout"
import { StoreProvider } from "../utils/Store"
import { SessionProvider } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <>
            <SessionProvider session={session}>
                <StoreProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </StoreProvider>
            </SessionProvider>
        </>
    )
}

export default MyApp
