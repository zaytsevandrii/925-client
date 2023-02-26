import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { getError } from '../utils/error'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router"

const LoginModal = ({ show, handleClose,allClose }) => {
    const { data: session } = useSession();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const router = useRouter();
    const { redirect } = router.query;
  
    useEffect(() => {
     /*  if (session?.user) {
        router.push(redirect || '/');
      } */
    }, [router, session, redirect]);

    
    const handleSubmit = async (event) => {
        event.preventDefault()
        /* console.log(`Submitted: Name: ${name}, Email: ${email}, Password: ${password}`) */
        try {
            const result = await signIn('credentials', {
              redirect: false,
              email,
              password,
            });
            handleClose()
            if (result.error) {
              toast.error(result.error);
            }
          } catch (err) {
            toast.error(getError(err));
          }
        /* handleClose() */
    }

    return (
        <Modal show={show} onHide={handleClose} centered className="pb-5">
            <Modal.Header closeButton>
                <Modal.Title>Логин</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите имя"
                            value={name}
                            /* required */
                            onInvalid={(e) => e.target.setCustomValidity("Пожалуйста, введите имя")}
                            onChange={(e) => {
                                e.target.setCustomValidity("")
                                setName(e.target.value)
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="mt-3">
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите email"
                            value={email}
                            onInvalid={(e) => e.target.setCustomValidity("Пожалуйста, введите почту")}
                            onChange={(e) => {
                                e.target.setCustomValidity("")
                                setEmail(e.target.value)
                            }}
                            required
                        />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onInvalid={(e) => e.target.setCustomValidity("Пожалуйста, введите пароль")}
                            onChange={(e) => {
                                e.target.setCustomValidity("")
                                setPassword(e.target.value)
                            }}
                            required
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="mt-3 w-100">
                        Логин
                    </Button>
                </Form>
                <div className="mt-3">
                    <p>
                        У вас еще нет аккаунта? <Link href="/register" onClick={allClose}>Зарегистрируйтесь здесь.</Link>.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal
