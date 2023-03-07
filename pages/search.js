import axios from "axios"
import { useRouter } from "next/router"
import { useContext } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"
/* import { XCircleIcon } from '@heroicons/react/outline'; */
import ProductItem from "../components/goods/ProductItem"
import Product from "../models/Product"
import db from "../utils/db"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import Image from "next/image"
import styles from "../styles/Seatch.module.scss"

const PAGE_SIZE = 20

const prices = [
    {
        name: "$1 to $50",
        value: "1-50",
    },
    {
        name: "$51 to $200",
        value: "51-200",
    },
    {
        name: "$201 to $1000",
        value: "201-1000",
    },
]

const ratings = [1, 2, 3, 4, 5]

export default function Search(props) {
    const router = useRouter()

    const {
        query = "all",
        category = "all",
        brand = "all",
        price = "all",
        rating = "all",
        sort = "featured",
        page = 1,
    } = router.query

    const { products, countProducts, categories, brands, pages } = props

    const filterSearch = ({ page, category, brand, sort, min, max, searchQuery, price, rating }) => {
        const { query } = router
        if (page) query.page = page
        if (searchQuery) query.searchQuery = searchQuery
        if (sort) query.sort = sort
        if (category) query.category = category
        if (brand) query.brand = brand
        if (price) query.price = price
        if (rating) query.rating = rating
        if (min) query.min ? query.min : query.min === 0 ? 0 : min
        if (max) query.max ? query.max : query.max === 0 ? 0 : max

        router.push({
            pathname: router.pathname,
            query: query,
        })
    }
    const categoryHandler = (e) => {
        filterSearch({ category: e.target.value })
    }
    const pageHandler = (page) => {
        filterSearch({ page })
    }
    const brandHandler = (e) => {
        filterSearch({ brand: e.target.value })
    }
    const sortHandler = (e) => {
        filterSearch({ sort: e.target.value })
    }
    const priceHandler = (e) => {
        filterSearch({ price: e.target.value })
    }
    const ratingHandler = (e) => {
        filterSearch({ rating: e.target.value })
    }

    const { state, dispatch } = useContext(Store)
    const addToCartHandler = async (product) => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            toast.error("Sorry. Product is out of stock")
            return
        }
        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
        router.push("/cart")
    }
    return (
        <>
            <div className={styles.search}>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col className="mt-3">
                                    <h2>Результаты поиска</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="flex items-center">
                                        {products.length === 0 ? "Нет" : countProducts} Совпадений
                                        {query !== "all" && query !== "" && " : " + query}
                                        {category !== "all" && " : " + category}
                                        {price !== "all" && " : Price " + price}
                                        {rating !== "all" && " : Rating " + rating + " & up"}
                                        &nbsp;
                                        {(query !== "all" && query !== "") ||
                                        category !== "all" ||
                                        rating !== "all" ||
                                        price !== "all" ? (
                                            <button
                                                onClick={() => router.push("/search")}
                                                style={{ border: "none", background: "inherit" }}
                                            >
                                                <Image
                                                    src="/trash.svg"
                                                    alt="корзина"
                                                    width={20}
                                                    height={20}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </button>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Категории</Form.Label>
                                        <Form.Control as="select" value={category} onChange={categoryHandler}>
                                            <option value="all">Все</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Сортировка</Form.Label>
                                        <Form.Control as="select" value={sort} onChange={sortHandler}>
                                          {/*   <option value="featured">Featured</option> */}
                                            <option value="lowest">Цена: по возрастанию</option>
                                            <option value="highest">Цена: по убыванию</option>
                                            {/* <option value="toprated">Customer Reviews</option> */}
                                            <option value="newest">Новые поступления</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col >
                                    <Row className="g-4 g-md-3">
                                        {products.map((product) => (
                                            <ProductItem
                                                key={product._id}
                                                product={product}
                                                addToCartHandler={addToCartHandler}
                                            />
                                        ))}
                                    </Row>
                                    <ul className="d-flex">
                                        {products.length > 0 &&
                                            [...Array(pages).keys()].map((pageNumber) => (
                                                <li key={pageNumber}>
                                                    <Button
                                                        variant="primary"
                                                        className={`m-2 ${page == pageNumber + 1 ? "fw-bold" : ""}`}
                                                        onClick={() => pageHandler(pageNumber + 1)}
                                                    >
                                                        {pageNumber + 1}
                                                    </Button>
                                                </li>
                                            ))}
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const pageSize = query.pageSize || PAGE_SIZE
    const page = query.page || 1
    const category = query.category || ""
    /*  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || ''; */
    const sort = query.sort || ""
    const searchQuery = query.query || ""

    const queryFilter =
        searchQuery && searchQuery !== "all"
            ? {
                  name: {
                      $regex: searchQuery,
                      $options: "i",
                  },
              }
            : {}
    const categoryFilter = category && category !== "all" ? { category } : {}
    /*  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {}; */
    const order =
        sort === "featured"
            ? { isFeatured: -1 }
            : sort === "lowest"
            ? { price: 1 }
            : sort === "highest"
            ? { price: -1 }
            : sort === "toprated"
            ? { rating: -1 }
            : sort === "newest"
            ? { createdAt: -1 }
            : { _id: -1 }

    await db.connect()
    const categories = await Product.find().distinct("category")
    /* const brands = await Product.find().distinct('brand'); */
    const productDocs = await Product.find(
        {
            ...queryFilter,
            ...categoryFilter,
            /*  ...priceFilter,
      ...brandFilter,
      ...ratingFilter, */
        },
        "-reviews"
    )
        .sort(order)
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .lean()

    const countProducts = await Product.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        /* ...priceFilter,
    ...brandFilter,
    ...ratingFilter, */
    })

    await db.disconnect()
    const products = productDocs.map(db.convertDocToObj)

    return {
        props: {
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
            categories,
            /*  brands, */
        },
    }
}
