import Product from '../../../models/Product';
import db from '../../../utils/db';


export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Ошибка на сервере" });
  }
}
