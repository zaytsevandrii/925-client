import User from "../../../../models/User"
import db from "../../../../utils/db"
import { getSession } from "next-auth/react"

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session || !session.user.isAdmin) {
        return res.status(401).send("админ авторизация обязательна")
    }
    if (req.method === "GET") {
        return getHandler(req, res)
    } else if (req.method === "DELETE") {
        return deleteHandler(req, res)
    } else if (req.method === "PUT") {
        return putHandler(req, res)
    } else {
        return res.status(400).send({ message: "Метод не разрешен" })
    }
}

const getHandler = async (req, res) => { 
  await db.connect()
  const user = await User.findById(req.query.id)
  await db.disconnect()
  res.send(user)
}

const putHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  if (user) {
      user.name = req.body.name
      user.email = req.body.email
      user.k = req.body.k
      await user.save()
      await db.disconnect()
      res.send({ message: "Пользователь успешно обновлен" })
  } else {
      await db.disconnect()
      res.status(404).send({ message: "Пользователь не найден" })
  }
}

const deleteHandler = async (req, res) => {
    await db.connect()
    const user = await User.findById(req.query.id)
    if (user) {
        if (user.email === "zaytsevandrii9@gmail.com") {
            return res.status(400).send({ message: "Нельзя удалить главного администратора" })
        }
        await user.remove()
        await db.disconnect()
        res.send({ message: "Пользователь удален" })
    } else {
        await db.disconnect()
        res.status(404).send({ message: "Пользователь не найден" })
    }
}

export default handler
