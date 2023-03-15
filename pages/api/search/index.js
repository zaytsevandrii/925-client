import db from "../../../utils/db"
import Product from "../../../models/Product"

const handler2 = async (req, res) => {
    if (req.method === "GET") {
        return getHandler(req, res)
    } else {
        return res.status(400).send({ message: "Метод не разрешен" })
    }
}
const PAGE_SIZE = 40;
const getHandler = async (req, res) => {
  
    const { query } = req
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
    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize),
        categories,
    })
}

export default handler2
