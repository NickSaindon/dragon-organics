export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, street1, city, state, zip, weightOz } = req.body;

  try {
    const response = await fetch("https://api.goshippo.com/shipments/", {
      method: "POST",
      headers: {
        Authorization: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address_from: {
          name: "Dragon Organics",
          street1: "182 Windsong Lane",
          city: "Lilburn",
          state: "GA",
          zip: "30047",
          country: "US",
        },
        address_to: {
          name,
          street1,
          city,
          state,
          zip,
          country: "US",
          is_residential: true,
        },
        parcels: [
          {
            length: "6",
            width: "4",
            height: "2",
            distance_unit: "in",
            weight: parseFloat(weightOz),
            mass_unit: "oz",
          },
        ],
        async: false,
      }),
    });

    const data = await response.json();

    if (!data.rates || data.rates.length === 0) {
      return res.status(400).json({ error: "No rates returned" });
    }

    const uspsRates = data.rates.filter(
      (rate) =>
        rate.provider === "USPS" && rate.attributes?.includes("BESTVALUE")
    );

    if (!uspsRates.length) {
      return res.status(404).json({ error: "No USPS BESTVALUE rate found" });
    }

    const bestRate = uspsRates[0];

    return res.status(200).json({ rate: parseFloat(bestRate.amount) });
  } catch (err) {
    console.error("Shippo error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
