import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react'
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { toast } from 'react-toastify';
import DashboardNavbar from '../../components/DashboardNavbar'
import styles from "../../styles/Cart.module.scss"
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

export default function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
  useReducer(reducer, {
    loading: true,
    users: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (userId) => {
    if (!window.confirm('Вы уверены?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Пользователь удален успешно');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <>
    <>
        <div className={styles.admin}>
            <Container fluid>
                <Row>
                    <DashboardNavbar />
                    <Col md={9} className="mt-4">
                    <h1 className="mb-4 text-xl">Users</h1>
      {loadingDelete && <div>Deleting...</div>}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Польз.</th>
                <th>Имя</th>
                <th>EMAIL</th>
                <th>Скидка %</th>
                <th>Админ</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id.substring(20, 24)}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{100 - (user.k * 100)} %</td>
                  <td>{user.isAdmin ? 'ДА' : 'НЕТ'}</td>
                  <td>
                    <Link href={`/admin/user/${user._id}`} passHref>
                      <Button variant="primary" className="me-2">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="danger" onClick={() => deleteHandler(user._id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
                    </Col>
                </Row>
            </Container>
        </div>
    </>
</>
  )
}
