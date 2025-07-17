import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { zip, weightOz } = req.body;

  if (!zip || !weightOz) {
    return res.status(400).json({ error: "Missing zip or weight" });
  }

  try {
    // Step 1: Get access token from USPS
    const tokenResponse = await axios.post(
      "https://api.usps.com/oauth2/v3/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.USPS_CLIENT_ID}:${process.env.USPS_CLIENT_SECRET}`
            ).toString("base64"),
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Call USPS Domestic Pricing API
    const rateResponse = await axios.get(
      "https://api.usps.com/prices/v1/domestic/rates",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fromZIPCode: "30047", // Your origin ZIP
          toZIPCode: zip,
          weightOz,
          lengthIn: 6,
          widthIn: 4,
          heightIn: 2,
          shape: "Parcel", // could also be "Flat", etc.
          serviceCode: "GND", // optional: get more services from USPS docs
        },
      }
    );

    return res.status(200).json({ rate: rateResponse.data });
  } catch (error) {
    console.error("❌ USPS API error:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch USPS rate", details: error.message });
  }
}
