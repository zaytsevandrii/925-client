import User from "../../../../models/User"
import db from "../../../../utils/db"
import { getSession } from "next-auth/react"

const handler2 = async (req, res) => {
    const session = await getSession({ req })
    
    if (req.method === "GET") {
        return getHandler(req, res)
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


export default handler2
