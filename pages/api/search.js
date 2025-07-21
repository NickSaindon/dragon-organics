import db from "../../utils/db";
import Product from "../../models/Product";

/**
 * Escapes special characters in a string for safe use in a regular expression.
 * Prevents regex injection and ReDoS vulnerabilities.
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function handler(req, res) {
  const { q } = req.query;

  // Validate query input
  if (!q || typeof q !== "string" || q.trim().length === 0 || q.length > 100) {
    return res
      .status(400)
      .json({ message: "Invalid or missing search query." });
  }

  await db.connect();

  try {
    const terms = q.trim().split(/\s+/).map(escapeRegex);

    // Build MongoDB filters safely
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

    const products = await Product.find({
      posted: true,
      name: { $ne: "" },
      description: { $ne: "" },
      category: { $ne: "" },
      size: { $ne: "" },
      $and: andFilters,
    }).lean();

    await db.disconnect();

    return res.status(200).json(products);
  } catch (err) {
    console.error("Search API error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
