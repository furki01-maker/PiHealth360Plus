// backend/.netlify/functions/create-payment.js
export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const { amount, memo } = body;

    // Sandbox için mock paymentId
    const paymentId = "sandbox-test-id";

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", paymentId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}