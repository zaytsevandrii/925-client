import db from "../../../utils/db"
import Product from "../../../models/Product"

const handler2 = async (req, res) => {
    
    if (req.method === "GET") {
        return getHandler(req, res)
    } else {
        return res.status(400).send({ message: "Метод не разрешен" })
    }
}

const getHandler = async (req, res) => { 
  await db.connect()
  const products = await Product.find({ category: "Шарфы" });
  await db.disconnect()
  res.send(products)
}


export default handler2
