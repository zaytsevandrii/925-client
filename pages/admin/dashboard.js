import React, { useReducer } from "react"
import styles from "../../styles/Cart.module.scss"
import { Container, Row, Col } from 'react-bootstrap';
import Link from "next/link";



function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, summary: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }

function AdminDashboardScreen() {
    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: true,
        summary: { salesData: [] },
        error: '',
      });
    return <>
      <Container fluid className="mt-4">
      <Row>
      <Col md={4}>
        <ul className="list-group">
          <li className="list-group-item active">
            <Link href="/admin/dashboard" style={{color:'inherit'}}>
            Администрирование
            </Link>
          </li >
          <li className="list-group-item">
            <Link href="/admin/orders" style={{color:'inherit'}}>Заказы</Link>
          </li>
          <li className="list-group-item">
            <Link href="/admin/products" style={{color:'inherit'}}>Продукты</Link>
          </li>
          <li className="list-group-item">
            <Link href="/admin/users" style={{color:'inherit'}}>Пользователи</Link>
          </li>
        </ul>
      </Col>
      <Col md={8}>
        <h1 className="mb-4 text-xl">Admin Dashboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div>
            <Row className="g-4">
              <Col>
                <Card className="m-5 p-5">
                  <Card.Title as="h2" className="text-3xl">
                    Сдесь будет сумма
                  </Card.Title>
                  <Card.Text>Sales</Card.Text>
                  <Link href="/admin/orders">View sales</Link>
                </Card>
              </Col>
              <Col>
                <Card className="m-5 p-5">
                  <Card.Title as="h2" className="text-3xl">
                    количество
                  </Card.Title>
                  <Card.Text>Orders</Card.Text>
                  <Link href="/admin/orders">Прсомотреть заказ</Link>
                </Card>
              </Col>
              <Col>
                <Card className="m-5 p-5">
                  <Card.Title as="h2" className="text-3xl">
                    всего продукто заказано
                  </Card.Title>
                  <Card.Text>Products</Card.Text>
                  <Link href="/admin/products">View products</Link>
                </Card>
              </Col>
              <Col>
                <Card className="m-5 p-5">
                  <Card.Title as="h2" className="text-3xl">
                    Всего пользователей
                  </Card.Title>
                  <Card.Text>Users</Card.Text>
                  <Link href="/admin/users">View users</Link>
                </Card>
              </Col>
            </Row>
            <h2 className="text-xl">Sales Report</h2>
            {/* <Bar options={{ legend: { display: true, position: 'right' } }} data={data} /> */}
          </div>
        )}
      </Col>
    </Row>
    </Container>
    </>
}

AdminDashboardScreen.auth = { adminOnly: true }

export default AdminDashboardScreen
