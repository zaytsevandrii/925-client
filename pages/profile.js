import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from "react-toastify";
import Meta from "../components/Meta";
import styles from '../styles/Register.module.scss'
import { getError } from "../utils/error";

export default function ProfileScreen() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (session) {
      setFormData({
        username: session.user.name,
        email: session.user.email,
        password: '',
        confirmPassword: '',
      });
    }
  }, [setFormData,session]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});
    // Проверка пароля
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Пароли не совпадают' });
      return;
    }
    // Проверка на минимальную длину пароля
    if (formData.password.length < 8) {
      setErrors({ password: 'Пароль должен быть не менее 8 символов' });
      return;
    }
    // Логика отправки формы на сервер
    try {
      await axios.put('/api/auth/update', {
        name:formData.username,
          email:formData.email,
          password:formData.password, 
      });
      const result = await signIn('credentials', {
        redirect: false,
        email:formData.email,
        password:formData.password,
      });
      toast.success('Профиль успешно обновлен');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
    return (
        <><Meta title='Изменение профиля'/>
            <Container>
                <div className={styles.register}>
                    <h2 className="text-center mt-4">Изменение профиля</h2>
                    <Row className="justify-content-center mt-2">
                        <Col md={8} sm={12}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Введите логин"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="email" className="mt-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Введите email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="mt-2">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Введите пароль"
                                        required
                                    />
                                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                </Form.Group>

                                <Form.Group controlId="confirmPassword" className="mt-2">
                                    <Form.Label>Подтверждение Пароля</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Подтвердите пароль"
                                        required
                                    />
                                    {errors.confirmPassword && (
                                        <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
                                    )}
                                </Form.Group>

                                <Button variant="dark" type="submit" className="mt-4 w-100">
                                    Изменить профиль
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}


ProfileScreen.auth = true;