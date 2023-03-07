import Link from "next/link"
import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useRouter } from "next/router"

const SearchModal = ({ show, handleClose, allClose }) => {
    const [query, setQuery] = useState("")

    const router = useRouter()
    const submitHandler = (e) => {
        e.preventDefault()
        router.push(`/search?query=${query}`)
    }

    return (
        <Modal show={show} onHide={handleClose} centered className="pb-5">
            <Modal.Header closeButton>
                <Modal.Title>Поиск</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} className="d-flex flex-column d-md-flex">
                        <Form.Control
                            type="text"
                            placeholder="Поиск товара"
                            className="mr-2"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button variant="dark" type="submit" className="mt-3 w-100" onClick={allClose}>
                            Поиск
                        </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SearchModal
