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
                                    Серебро
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/bijouterie") ? "active" : ""}`}>
                                <Link href="/admin/bijouterie" style={{ color: "inherit" }}>
                                    Бижутерия
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/watch") ? "active" : ""}`}>
                                <Link href="/admin/watch" style={{ color: "inherit" }}>
                                    Часы
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/bags") ? "active" : ""}`}>
                                <Link href="/admin/bags" style={{ color: "inherit" }}>
                                    Сумки
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/children-jewelry") ? "active" : ""}`}>
                                <Link href="/admin/children-jewelry" style={{ color: "inherit" }}>
                                    Детские Украшения
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/scarves") ? "active" : ""}`}>
                                <Link href="/admin/scarves" style={{ color: "inherit" }}>
                                    Шарфы
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/perfumery") ? "active" : ""}`}>
                                <Link href="/admin/perfumery" style={{ color: "inherit" }}>
                                    Парфюмерия
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/natural-stones") ? "active" : ""}`}>
                                <Link href="/admin/natural-stones" style={{ color: "inherit" }}>
                                    Натуральные камни
                                </Link>
                            </li>
                            <li className={`list-group-item ${isActive("/admin/new-product") ? "active" : ""}`}>
                                <Link href="/admin/new-product" style={{ color: "inherit" }}>
                                    Новинки
                                </Link>
                            </li>
                        </ul>
                    </Col>
  )
}
