import React from "react"
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "../styles/Navbar.module.scss"

const DropDownLink = ({ userName,logoutClickHandler }) => {
   

    return (
        <NavDropdown id="nav-dropdown-dark-example" title={userName.charAt(0).toUpperCase()} menuVariant="dark" >
            <NavDropdown.Item href="/profile">Профиль</NavDropdown.Item>
            <NavDropdown.Item href="/order-history">История заказов</NavDropdown.Item>
            <NavDropdown.Item onClick={logoutClickHandler}>Выход</NavDropdown.Item>
        </NavDropdown>
    )
}

export default DropDownLink
