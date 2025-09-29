import axios from "axios";

export async function handler(event, context) {
  try {
    const { paymentId, txid } = JSON.parse(event.body);

    const url = process.env.PI_ENV === "production"
      ? https://api.minepi.com/v2/payments/${paymentId}/complete
      : https://sandbox.minepi.com/v2/payments/${paymentId}/complete;

    const response = await axios.post(
      url,
      { txid },
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