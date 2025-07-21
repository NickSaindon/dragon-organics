import db from "../../utils/db";
import Product from "../../models/Product";

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q || q.trim().length === 0) {
    return res.status(400).json({ message: "Missing search query" });
  }

  await db.connect();

  try {
    const terms = q.trim().split(/\s+/); // Split on spaces

    // Build a filter for each term
    const andFilters = terms.map((term) => {
      const regex = new RegExp(term, "i");
      return {
        $or: [
          { name: regex },
          { description: regex },
          { category: regex },
          { color: regex },
          { size: regex },
        ],
      };
    });

    const products = await Product.find({ $and: andFilters }).lean();

    await db.disconnect();

    return res.status(200).json(products);
  } catch (err) {
    console.error("Search API error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
