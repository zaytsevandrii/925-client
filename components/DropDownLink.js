import React from "react"
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "../styles/Navbar.module.scss"

const DropDownLink = ({ userName,logoutClickHandler, session }) => {
   

    return (
        <NavDropdown id="dropdown-menu-align-responsive-1" align={{ lg: 'start' }} title={userName.charAt(0).toUpperCase()} menuVariant="dark" >
            <NavDropdown.Item href="/profile">Профиль</NavDropdown.Item>
            {session.user.isAdmin && (
                <NavDropdown.Item href="/admin/dashboard">Админ</NavDropdown.Item>
            )}
            <NavDropdown.Item href="/order-history">История заказов</NavDropdown.Item>
            <NavDropdown.Item onClick={logoutClickHandler}>Выход</NavDropdown.Item>
            
        </NavDropdown>
    )
}

export default DropDownLink
