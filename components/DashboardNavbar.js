import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Col } from 'react-bootstrap'

export default function DashboardNavbar() {
  const router = useRouter()

  const isActive = (pathname) => {
    if (router.pathname === pathname) {
      return true
    } else if (router.pathname.startsWith('/admin/product')) {
      return pathname.startsWith('/admin/products')
    } else {
      return false
    }
  }
  return (
    <Col md={3} className="mt-4">
                        <ul className="list-group">
                            <li className={`list-group-item ${isActive("/admin/dashboard") ? "active" : ""}`}>
                                <Link href="/admin/dashboard" style={{ color: "inherit" }}>
                                    Администрирование
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/orders") ? "active" : ""}`}>
                                <Link href="/admin/orders" style={{ color: "inherit" }}>
                                    Заказы
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/users") ? "active" : ""}`}>
                                <Link href="/admin/users" style={{ color: "inherit" }}>
                                    Пользователи
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/products") ? "active" : ""}`}>
                                <Link href="/admin/products" style={{ color: "inherit" }}>
                                    Продукты
                                </Link>
                            </li>
                        </ul>
                    </Col>
  )
}
