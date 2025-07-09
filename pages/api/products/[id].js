import { createRouter } from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

router.put(async (req, res) => {
  const { quantity } = req.body;

  await db.connect();
  const product = await Product.findById(req.query.id);

  if (!product) {
    await db.disconnect();
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.countInStock < quantity) {
    await db.disconnect();
    return res.status(404).json({ message: "Not enough stock available" });
  }

  product.countInStock -= quantity;
  await product.save();
  await db.disconnect();

  res.status(200).json({ message: "Stock updated successfully" });
});

export default router.handler();
