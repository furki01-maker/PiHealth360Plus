import axios from "axios";

export async function handler(event, context) {
  try {
    const { amount, memo, receiver } = JSON.parse(event.body);

    // Sandbox veya Production URL: Sandbox için sandbox.minepi.com, production için api.minepi.com
    const url = process.env.PI_ENV === "production"
      ? "https://api.minepi.com/v2/payments"
      : "https://sandbox.minepi.com/v2/payments";

    const response = await axios.post(
      url,
      {
        amount,
        currency: "Pi",
        receiver,
        memo: memo || "Health360+ Payment"
      },
      {
        headers: {
          Authorization: Key ${process.env.PI_API_KEY},
          "Content-Type": "application/json"
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}