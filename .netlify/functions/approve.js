// backend/.netlify/functions/approve.js
import axios from "axios";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const paymentId = body.paymentId;

    const response = await axios.post(
      https://api.minepi.com/v2/payments/${paymentId}/approve,
      {},
      {
        headers: {
          Authorization: Key ${process.env.PI_API_KEY},
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}