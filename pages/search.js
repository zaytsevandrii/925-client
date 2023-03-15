import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Store } from "../utils/Store"
import ProductItem from "../components/goods/ProductItem"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import Image from "next/image"
import styles from "../styles/Seatch.module.scss"
import { useSession } from "next-auth/react"

const PAGE_SIZE = 10


export default function Search() {
    const router = useRouter()
    const { status, data: session } = useSession()
    const [k, setK] = useState(1)
    const [data,setData] = useState({})
    const [isLoading,setIsloadin] = useState(true)
    const {
        query = "all",
        category = "all",
        price = "all",
        rating = "all",
        sort = "featured",
        page = 1,
    } = router.query
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`/api/search?page=${page}&query=${query}&category=${category}&sort=${sort}`)
                setData(data)
                setIsloadin(false)

            } catch (err) {
                console.log(err)
            }
        }
        fetchOrders()
    }, [category,page,query,sort])
    const { products, countProducts, categories,  pages } = data

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
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/users2/${session.user._id}`)
                setK(data.k)
            } catch (err) {
                console.log(err)
            }
        }
        if (session?.user) {
            fetchData()
        }
    }, [session])
    return (
        <>
            <div className={styles.search}>
              
                  <Container>{isLoading?<div className="mt-3">Загрузка..</div>:(
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
                                          <option value="lowest">Цена: по возрастанию</option>
                                          <option value="highest">Цена: по убыванию</option>
                                          <option value="newest">Новинки</option>
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
                                              k={k}
                                          />
                                      ))}
                                  </Row>
                                  <ul className="d-flex">
                                      {products.length > 0 &&
                                          [...Array(pages).keys()].map((pageNumber) => (
                                              <li key={pageNumber}>
                                                  <Button
                                                      variant="dark"
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
                  </Row> )}
              </Container>
             
            </div>
        </>
    )
}

/* export async function getServerSideProps({ query }) {
    const pageSize = query.pageSize || PAGE_SIZE
    const page = query.page || 1
    const category = query.category || ""
 
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
    const productDocs = await Product.find(
        {
            ...queryFilter,
            ...categoryFilter,
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
        },
    }
} */
