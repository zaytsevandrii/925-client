import "../styles/globals.scss"
import Navbar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Navbar>
                <Component {...pageProps} />
            </Navbar>
        </>
    )
}

export default MyApp
