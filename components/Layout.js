import React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { ToastContainer } from "react-toastify"

const Layout = ({ children }) => {
    return (
        <>
            <ToastContainer position="bottom-center" limit={1} />
            <Navbar />
            <div>{children}</div>
            <Footer />
        </>
    )
}

export default Layout
