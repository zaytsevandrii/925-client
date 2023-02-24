import "../styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "../components/Layout"
import { StoreProvider } from "../utils/Store"
function MyApp({ Component, pageProps }) {
    return (
        <>
            <StoreProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StoreProvider>
        </>
    )
}

export default MyApp
