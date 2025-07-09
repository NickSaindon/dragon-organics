// pages/api/order.js
import Order from "../../../models/Order";
import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connect();

    const newOrder = new Order({
      ...req.body,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order save failed:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
}
