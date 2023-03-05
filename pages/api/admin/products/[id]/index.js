import { getSession } from "next-auth/react"
import Product from "../../../../../models/Product"
import db from "../../../../../utils/db"

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send("админ авторизация обязательна!")
    }

    const { user } = session
    if (req.method === "GET") {
        return getHandler(req, res, user)
    } else if (req.method === "PUT") {
        return putHandler(req, res, user)
    } else if (req.method === "DELETE") {
        return deleteHandler(req, res, user)
    } else {
        return res.status(400).send({ message: "Method not allowed" })
    }
}

const getHandler = async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    await db.disconnect()
    res.send(product)
}

const putHandler = async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    if (product) {
        product.name = req.body.name
        product.slug = req.body.slug
        product.price = req.body.price
        product.category = req.body.category
        product.image = req.body.image
        product.countInStock = req.body.countInStock
        product.description = req.body.description
        await product.save()
        await db.disconnect()
        res.send({ message: "Товар успешно обновлен" })
    } else {
        await db.disconnect()
        res.status(404).send({ message: "Товар не найден" })
    }
}

const deleteHandler = async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    if (product) {
        await product.remove()
        await db.disconnect()
        res.send({ message: "Товар успешно удален" })
    } else {
        await db.disconnect()
        res.status(404).send({ message: "Товар не найден" })
    }
}

export default handler
